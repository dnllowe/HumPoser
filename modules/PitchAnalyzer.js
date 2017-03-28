'use strict';

const SAMPLE_RATE = 441000;
const audioEvents = require('./AudioEventEmitter'); 
const detectPitch = require('detect-pitch');
const notes = require('./Notes');

const n = 4096
const ω = 2 * Math.PI / n

let pitchValues = [];
let sustainedPitch = [];
let isLogging = false;

let clipStart = null;
let noteStart = null;
let previousNote = null;
let currentNote = null;

audioEvents.on('audio-clip-start', () => {
    pitchValues = [];
    sustainedPitch = [];
    clipStart = null;
    noteStart = null;
    previousNote = null;
    currentNote = null;
    clipStart = new Date().getTime();
});

audioEvents.on('audio-clip-stop', () => { 
    audioEvents.emit('send-clip', [...pitchValues]);
    pitchValues = [];
    sustainedPitch = [];
    clipStart = null;
    noteStart = null;
    previousNote = null;
    currentNote = null;
});

audioEvents.on('audio-stream', (audioBuffer, volume) => {
    let pitch = detectPitch(audioBuffer);
    currentNote = getNearestNote(pitch);
    console.log("PITCH FREQUENCY:", pitch);


    recordNoteContinuous();    
    console.log("RECORDED NOTE:", pitchValues[pitchValues.length - 1]);
});

audioEvents.on('audio-stream-start', () => {
    noteStart = new Date().getTime();
});

audioEvents.on('audio-stream-stop', () => {
    // recordNoteOnEnd();
    // console.log("RECORDED NOTE:", pitchValues[pitchValues.length - 1]);
});

audioEvents.on('audio-log-start', () => {
    isLogging = true;
});

audioEvents.on('audio-log-stop', () => {
    isLogging = false;
});

const getNearestNote = (pitch) => {
    let nearestNote = null; 
    for (let i = 0; i < notes.length; i++) {
        if (i + 1 >= notes.length) {
            nearestNote = notes[i];
            break;
        } else if (pitch <= notes[i].pitch && pitch >= notes[i + 1].pitch) {
            const sharpness = Math.abs(pitch - notes[i].pitch);
            const flatness = Math.abs(pitch - notes[i + 1].pitch);
            nearestNote = sharpness < flatness ? notes[i] : notes[i + 1];
            break;
        }
    }
    return nearestNote;
}

const getAveragePitch = (pitches) => {
    let totalNoteValue = 0;
    pitches.forEach((pitch) => {
        totalNoteValue += pitch;
    });
    return totalNoteValue / pitches.length;
}

const recordNoteOnEnd = () => {
    const now = new Date().getTime();
    currentNote.duration = now - noteStart; 
    currentNote.time = (noteStart - clipStart);
    pitchValues.push(Object.assign({}, currentNote));
    noteStart = null;
    previousNote = null;
    currentNote = null;
}

const recordNoteContinuous = () => {
    const now = new Date().getTime();
    currentNote.duration = now - noteStart; 
    currentNote.time = (noteStart - clipStart);
    pitchValues.push(Object.assign({}, currentNote));
    noteStart = now;
    currentNote = null;
}
export default pitchValues;