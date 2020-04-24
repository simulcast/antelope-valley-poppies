import React from 'react'
import Tone from 'tone'
import styled from 'styled-components'
// import Recorder from 'recorder-js'
import Recorder from './Recorder'

/* this is where all the sound operations happen
instantiates Tone.js and contains the RecordButton class 
sound management happens kind of haphazardly for now,
eventually it'd be great to manage with state
also to manage whether or not the recordbutton shows by device / browser type
*/

const bpm = 80;

export default class TonePlayer extends React.Component {
  constructor(props) {
    super(props)

    /* threshhold array */

    this.thresh = [1, 2, 3, 15, 20, 25, 30];

    /* Tone.js */

    this.audioContext = new Tone.Context();
    Tone.setContext(this.audioContext);

    Tone.Transport.bpm.value = bpm;

    this.droneNote1 = new Tone.Frequency("D4");
    this.droneNote2 = new Tone.Frequency("A4");

    this.reverb = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.02
    }).toMaster();
    this.reverb.generate();

    this.lowpass = new Tone.Filter(800, "lowpass", -12).connect(this.reverb);

    this.mod1 = new Tone.LFO("4m", 600, 800);
    this.mod1.connect(this.lowpass.frequency);

    this.droneOsc1 = new Tone.Noise({
      type : "white" ,
      playbackRate : 1,
    }).connect(this.lowpass);
    this.droneOsc1.volume.value = -16;

    this.droneOsc2 = new Tone.Oscillator({
      type : "sine" ,
      frequency : this.droneNote1 ,
      detune : +10 ,
      phase : 0 ,
      partials : [] ,
      partialCount : 0
    }).connect(this.lowpass);
    this.droneOsc2.volume.value = -8;

    this.droneOsc3 = new Tone.Oscillator({
      type : "sine" ,
      frequency : this.droneNote2 ,
      detune : -10 ,
      phase : 0 ,
      partials : [] ,
      partialCount : 0
    }).connect(this.lowpass);
    this.droneOsc3.volume.value = -8;

  }

  componentDidUpdate() {
    /* can we re-program this with state? */

    const currUsers = this.props.currUsers
    const prevUsers = this.props.prevUsers
    const playState = this.props.playState
    
    /* variable to test if user count is increasing */
    let increasing
    if (currUsers > prevUsers) {
      increasing = true
    }

    // console.log(currUsers, prevUsers, playState)

    /* if playState === true, then engage the sound on/off flow */

    if (playState) {
      if (currUsers === 1) {
        Tone.Transport.start('+.05'); // delaying transport start helps with audio dropouts on mobile
        this.droneOsc1.start('@16n');
        this.mod1.start();
      }
      if (currUsers === 1 && !increasing) {
        this.droneOsc2.stop();
      }
      if (currUsers === 2 && increasing) {
        this.droneOsc2.start('@16n');
      }
      if (currUsers === 2 && !increasing) {
        this.droneOsc3.stop();
      }
      if (currUsers === 3 && increasing) {
        this.droneOsc3.start('@16n');
      }
    }
  }

  render() {
    // return (
    //   <Recorder
    //     onClick={this.props.onClick}
    //     playState={this.props.playState}
    //     recordState={this.props.recordState}
    //     context ={this.audioContext}
    //   />
    // )
    return null
  }
}