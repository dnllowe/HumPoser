'use strict';

const audioEvents = require('./AudioEventEmitter');

let mediaRecorder = null;

class Recorder {

  constructor() {

    this.audioBuffer = [];
    this.BUFFER_SIZE = 4096;
    this.recording = false;
    this.streaming = false;
    this.initialPeak = 0;
    this.isCapturingPeak = false;
    this.isPeakSet = false;
    this.initialThreshold = 0.00005;
    this.secondaryThreshold = 0.00002;
    this.recorderProcess = this.recorderProcess.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.convertFloat32ToInt16 = this.convertFloat32ToInt16.bind(this);
    this.session = { audio: true }
    this.audioContext = null;
    this.gainNode = null;
    this.audioAnalyzer = null;

 /*   navigator.mediaDevices.getUserMedia(this.session)
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.onstop = (e) => {
          const blob = new Blob(this.audioBuffer, { 'type': 'audio/ogg; codecs=opus' });
          this.audioBuffer = [];
          const audio = document.getElementById('record');
          const audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
        }
        
        mediaRecorder.ondataavailable = (e) => {
          this.audioBuffer.push(e.data);
          audioEvents.emit('audio-stream', e.data);
        }
      })
      .catch(console.error);
*/
    
    // Process audio samples from microphone
    navigator.mediaDevices.getUserMedia(this.session)
      .then((stream) => {
        this.audioContext = new window.AudioContext();  
       
        // Add gain to the context
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0;
        this.gainNode.connect(this.audioContext.destination);

        // create a javascript node, specify callback for receiving audio, connect to context
        const recorder = this.audioContext.createScriptProcessor(this.BUFFER_SIZE, 1, 1);
        recorder.onaudioprocess = this.recorderProcess;
        recorder.connect(this.audioContext.destination);    

         // Connect microphone stream to gain to and recording        
        const microphoneStream = this.audioContext.createMediaStreamSource(stream);
        microphoneStream.connect(this.gainNode);
        microphoneStream.connect(recorder);
      })
      .catch(console.error);
  }  

  recorderProcess(e) {  
    if (!this.recording) { return; }

    const leftChannel = e.inputBuffer.getChannelData(0);
    let volume = 0;
    let totalAmplitude = 0;
    leftChannel.forEach(frequencyAmplitude => {
      totalAmplitude += frequencyAmplitude;
    });
    volume = Math.abs(totalAmplitude / this.BUFFER_SIZE);

    if (volume > this.initialThreshold) {
      // Start recording and streaming audio
      if (!this.streaming) {
        this.streaming = true;
        audioEvents.emit('audio-stream-start');
        audioEvents.emit('audio-log-start');
      }
      audioEvents.emit('audio-stream', leftChannel, volume);

    } else if (volume < this.secondaryThreshold) {
      if (this.streaming) {
        this.streaming = false;
        audioEvents.emit('audio-stream-stop');
        audioEvents.emit('audio-log-stop');
        console.log('FELL BELOW VOLUME THRESHOLD');
      }  
    }
  }
  
  /**
   * Converts a 32 bit integer buffer to a 16 bit integer buffer
   * @param {Buffer} inputBuffer the buffer to convert
   */
  convertFloat32ToInt16(inputBuffer) {
    let length = inputBuffer.length;
    const buffer = new Int16Array(length);
    while (length--) {
      buffer[length] = Math.min(1, inputBuffer[length]) * 0x7FFF;
    }
    return buffer;
  }  

  start() {
  //  this.gainNode.gain.value = 1;

  //  mediaRecorder.start(100);    
    let date = new Date().toString();
    const removeIndex = date.indexOf('(') - 1;
    date = date.slice(0, removeIndex).replace(/\s/g, '-');  
    this.recording = true;
    audioEvents.emit('audio-clip-start');
  }

  stop() {
  //  mediaRecorder.stop();

    if (this.streaming) {
      audioEvents.emit('audio-stream-stop');
      this.streaming = false;
    }  
    this.recording = false;
    this.gainNode.gain.value = 0; 
    audioEvents.emit('audio-clip-stop');
  } 

  capturePeak(volume) {
    if (this.initialPeak < volume) {
      this.initialPeak = volume;
    }
  }

  stopCapturingPeak(time) {
    setTimeout(() => {
      this.isCapturingPeak = false;
      this.isPeakSet = true;
    }, time);
  }
}

export default Recorder;
