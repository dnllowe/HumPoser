import React from 'react';

const AudioTest = (props) => {

  const selectRecord = () => {
    recordButton.classList.add('selected');
    playButton.classList.remove('selected');
  }

  const deselectAll = () => {
    recordButton.classList.remove('selected');
    playButton.classList.remove('selected');
  }
  
  const selectPlay = () => {
    playButton.classList.add('selected');
    recordButton.classList.remove('selected');
  }

  let recordButton = null;
  let stopButton = null;
  let playButton = null;
  
  return (
    <div style={ {textAlign: 'center'}}>
      <h1>Hum-Poser</h1>
      <p><strong>Hum along. Compose a song.</strong></p>
      <button ref={(button) => { recordButton = button }} style={{ margin: '20px' }} onClick={() => { props.recorder.start(); selectRecord()}}>Record</button>
      <button ref={(button) => { stopButton = button }} style={{ margin: '20px' }} onClick={() => { props.recorder.stop(); deselectAll(); }}>Stop</button>
      <button ref={(button) => { playButton = button }} style={{ margin: '20px' }} onClick={() => { props.playSound(); selectPlay() }}>Play</button>
      <br />

      {/*INSTRUMENT SELECTION*/}
      <select
        name='instrument'
        style={{ margin: '20px' }}
        onChange={props.handleChange}
        defaultValue={props.note}
      >
        {
          props.instruments.map(instrument => {
            return (          
              <option key={instrument.name}>{instrument.name}</option>
            )
          })
        }
      </select>
      
      {/*EFFECT SELECTION*/}
      <select
      style={{ margin: '20px' }}  
        name='effect'
        onChange={props.handleChange}
      >
        {
          props.effects.map(effect => {
            return (
              <option key={effect.name}>{effect.name}</option>  
            )
          })
        }
      </select>
    </div>
  );
}

export default AudioTest;
