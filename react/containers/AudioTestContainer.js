import React, { Component } from 'react';

import { Tone, synth, guitar, violin, distortion } from '../../modules/Tone';
import Recorder from '../../modules/Recorder';
import AudioTest from '../components/AudioTest';
import audioEvents from '../../modules/AudioEventEmitter';

let notes = [];

class AudioTestContainer extends Component {

  constructor() {
    super();

    this.state = {
      octave: 4,
      note: 'C',
      instrument: 'Guitar',
      effect: 'none'
    }

    this.instruments = [{ name: 'Guitar' }, { name: 'Violin' }, {name: 'Synth'}];  
    this.effects = [{ name: 'none' }, { name: 'distortion' }];

    this.octaves = [1, 2, 3, 4, 5];    
    this.notes = [
      'A', 'A#',
      'B',
      'C', 'C#',
      'D', 'D#',
      'E',
      'F', 'F#',
      'G', 'G#'
    ];

    this.recorder = new Recorder();
    
    this.playSound = this.playSound.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logNote = this.logNote.bind(this);
    this.selectDistortion = this.selectDistortion.bind(this);
    this.selectNone = this.selectNone.bind(this);

    // Connect distortion to all notes    
    Object.keys(guitar).forEach(note => {
      guitar[note].connect(distortion);
    });

    Object.keys(violin).forEach(note => {
      violin[note].connect(distortion);
    });
    synth.connect(distortion);
    distortion.wet.value = 0;
  }  

  playSound() {
    notes.forEach(note => {
      setTimeout(() => {
              
        if (this.state.instrument === 'Guitar') {
          if (note.note === 'C2' || note.note === 'D2') {
            guitar[note.note].triggerAttack(-12);
          } else if (note.note === 'A5' || note.note === 'F5') {
            guitar[note.note].triggerAttack(12);
          } else {
            guitar[note.note].triggerAttack();
          }
        }
         
        else if (this.state.instrument === 'Violin') {
          if (note.note === 'E2' || note.note === 'F2' ||
            note.note === 'C2' || note.note === 'D2') {
            violin[note.note].triggerAttack(-24);
          } else if (note.note === 'E3' || note.note === 'F3' ||
            note.note === 'C3' || note.note === 'D3' ||
            note.note === 'B2' || note.note === 'G2' || note.note === 'A2') {
              violin[note.note].triggerAttack(-12);
          } else {
            violin[note.note].triggerAttack();
          }
        }
               
        else if (this.state.instrument === 'Synth') {
          synth.triggerAttackRelease(note.note, note.duration / 1000)
        }
      }, note.time);
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.value === 'distortion') {
      this.selectDistortion();
    }

    if (event.target.value === 'none') {
      this.selectNone();
    }
  }  

  selectDistortion() {
    distortion.wet.value = 1;
  } 
  
  selectNone() {
    distortion.wet.value = 0;
  }

  logNote() {
    console.log(this.state.note + this.state.octave);
  }  

  render() {
    return (
      <AudioTest
        recorder={this.recorder}  
        octave={this.state.octave}
        octaves={this.octaves}
        note={this.state.note}
        notes={this.notes}
        playSound={this.playSound}
        handleChange={this.handleChange}
        logNote={this.logNote}
        instruments={this.instruments}
        effects={this.effects}
        selectDistortion={this.selectDistortion}
        selectNone={this.selectNone}
      />
    );
  }
}

audioEvents.on('send-clip', (notesArray) => {
  notes = [...notesArray];
})

export default AudioTestContainer;
