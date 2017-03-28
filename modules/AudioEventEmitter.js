'use strict';

const fastEmitter = require('fast-event-emitter');

class AudioEventEmitter extends fastEmitter { }
const audioEvents = new AudioEventEmitter();
let filepath = '';

audioEvents.on('audio-clip-start', () => {
  console.log('Audio recording started');
});

audioEvents.on('audio-clip-stop', () => {
  console.log('Audio recording stopped');
});

module.exports = audioEvents;
export default audioEvents;