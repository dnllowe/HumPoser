const Tone = require('Tone');

export const synth = new Tone.Synth().toMaster();
export const distortion = new Tone.Distortion(1).toMaster();

export const guitar = {
  E2: new Tone.Sampler('./resources/sounds/guitar-samples/E2.mp3').toMaster(),
  E3: new Tone.Sampler('./resources/sounds/guitar-samples/E3.mp3').toMaster(),
  E4: new Tone.Sampler('./resources/sounds/guitar-samples/E4.mp3').toMaster(),
  E5: new Tone.Sampler('./resources/sounds/guitar-samples/E5.mp3').toMaster(),

  F2: new Tone.Sampler('./resources/sounds/guitar-samples/F2.mp3').toMaster(),
  F3: new Tone.Sampler('./resources/sounds/guitar-samples/F3.mp3').toMaster(),
  F4: new Tone.Sampler('./resources/sounds/guitar-samples/F4.mp3').toMaster(),
  F5: new Tone.Sampler('./resources/sounds/guitar-samples/F4.mp3').toMaster(),

  G2: new Tone.Sampler('./resources/sounds/guitar-samples/G2.mp3').toMaster(),
  G3: new Tone.Sampler('./resources/sounds/guitar-samples/G3.mp3').toMaster(),
  G4: new Tone.Sampler('./resources/sounds/guitar-samples/G4.mp3').toMaster(),
  G5: new Tone.Sampler('./resources/sounds/guitar-samples/G5.mp3').toMaster(),

  A2: new Tone.Sampler('./resources/sounds/guitar-samples/A2.mp3').toMaster(),
  A3: new Tone.Sampler('./resources/sounds/guitar-samples/A3.mp3').toMaster(),
  A4: new Tone.Sampler('./resources/sounds/guitar-samples/A4.mp3').toMaster(),
  A5: new Tone.Sampler('./resources/sounds/guitar-samples/A4.mp3').toMaster(),

  B2: new Tone.Sampler('./resources/sounds/guitar-samples/B2.mp3').toMaster(),
  B3: new Tone.Sampler('./resources/sounds/guitar-samples/B3.mp3').toMaster(),
  B4: new Tone.Sampler('./resources/sounds/guitar-samples/B4.mp3').toMaster(),
  B5: new Tone.Sampler('./resources/sounds/guitar-samples/B5.mp3').toMaster(),

  C2: new Tone.Sampler('./resources/sounds/guitar-samples/C3.mp3').toMaster(),  // Play -12
  C3: new Tone.Sampler('./resources/sounds/guitar-samples/C3.mp3').toMaster(),
  C4: new Tone.Sampler('./resources/sounds/guitar-samples/C4.mp3').toMaster(),
  C5: new Tone.Sampler('./resources/sounds/guitar-samples/C5.mp3').toMaster(),

  D2: new Tone.Sampler('./resources/sounds/guitar-samples/D3.mp3').toMaster(),  // Play -12
  D3: new Tone.Sampler('./resources/sounds/guitar-samples/D3.mp3').toMaster(),
  D4: new Tone.Sampler('./resources/sounds/guitar-samples/D4.mp3').toMaster(),
  D5: new Tone.Sampler('./resources/sounds/guitar-samples/D5.mp3').toMaster(),
}

export const violin = {
  E2: new Tone.Sampler('./resources/sounds/violin-samples/E4.mp3').toMaster(),
  E3: new Tone.Sampler('./resources/sounds/violin-samples/E4.mp3').toMaster(),
  E4: new Tone.Sampler('./resources/sounds/violin-samples/E4.mp3').toMaster(),
  E5: new Tone.Sampler('./resources/sounds/violin-samples/E5.mp3').toMaster(),

  F2: new Tone.Sampler('./resources/sounds/violin-samples/F4.mp3').toMaster(),
  F3: new Tone.Sampler('./resources/sounds/violin-samples/F4.mp3').toMaster(),
  F4: new Tone.Sampler('./resources/sounds/violin-samples/F4.mp3').toMaster(),
  F5: new Tone.Sampler('./resources/sounds/violin-samples/F4.mp3').toMaster(),

  G2: new Tone.Sampler('./resources/sounds/violin-samples/G3.mp3').toMaster(),
  G3: new Tone.Sampler('./resources/sounds/violin-samples/G3.mp3').toMaster(),
  G4: new Tone.Sampler('./resources/sounds/violin-samples/G4.mp3').toMaster(),
  G5: new Tone.Sampler('./resources/sounds/violin-samples/G5.mp3').toMaster(),

  A2: new Tone.Sampler('./resources/sounds/violin-samples/A3.mp3').toMaster(),
  A3: new Tone.Sampler('./resources/sounds/violin-samples/A3.mp3').toMaster(),
  A4: new Tone.Sampler('./resources/sounds/violin-samples/A4.mp3').toMaster(),
  A5: new Tone.Sampler('./resources/sounds/violin-samples/A5.mp3').toMaster(),

  B2: new Tone.Sampler('./resources/sounds/violin-samples/B3.mp3').toMaster(),
  B3: new Tone.Sampler('./resources/sounds/violin-samples/B3.mp3').toMaster(),
  B4: new Tone.Sampler('./resources/sounds/violin-samples/B4.mp3').toMaster(),
  B5: new Tone.Sampler('./resources/sounds/violin-samples/B5.mp3').toMaster(),

  C2: new Tone.Sampler('./resources/sounds/violin-samples/C4.mp3').toMaster(),  // Play -12
  C3: new Tone.Sampler('./resources/sounds/violin-samples/C4.mp3').toMaster(),
  C4: new Tone.Sampler('./resources/sounds/violin-samples/C4.mp3').toMaster(),
  C5: new Tone.Sampler('./resources/sounds/violin-samples/C5.mp3').toMaster(),

  D2: new Tone.Sampler('./resources/sounds/violin-samples/D4.mp3').toMaster(),  // Play -12
  D3: new Tone.Sampler('./resources/sounds/violin-samples/D4.mp3').toMaster(),
  D4: new Tone.Sampler('./resources/sounds/violin-samples/D4.mp3').toMaster(),
  D5: new Tone.Sampler('./resources/sounds/violin-samples/D5.mp3').toMaster(),
}

export default Tone;