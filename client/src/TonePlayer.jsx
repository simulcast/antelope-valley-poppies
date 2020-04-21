import React from 'react'
import Tone from 'tone'

const bpm = 80;

export default class TonePlayer extends React.Component {
  constructor(props) {
    super(props)

    console.log(props.playState)

    /* Tone.js */

    Tone.Transport.bpm.value = bpm;

    /* setting up sound sources */

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

  componentWillUpdate() {
    /* sequencing goes here */
    Tone.Transport.start();
    this.droneOsc1.start();
    this.droneOsc2.start();
    this.droneOsc3.start();
    this.mod1.start();
  }

  render() {
    return (
      <div></div>
    )
  }
}