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

const LoadButton = styled.button`
  z-index: 200;
  background: linear-gradient(var(--darkblue), var(--darkblue)), linear-gradient(white, white);
  font-family: "Space Mono", monospace;
  font-size: 1.2em;
  font-weight: 700;
  color: white;
  text-decoration: none;
  padding: 20px;
  display: inline-block;
  transition: all 0.4s ease 0s;
  text-align: center;
  align-self: center;
  margin: 0 auto;
  display: block;
  width: 20%;
  border: 0px;

  @media only screen and (max-width: 812px) {
    /* For mobile phones: */
    ${'' /* align-self: bottom; */}
    width: 200px;
  }
`

const bpm = 80;

export default class TonePlayer extends React.Component {
  constructor(props) {
    super(props)

    /* threshhold array */

    this.thresh = [1, 2, 3, 15, 20, 25, 30];

    /* Tone.js */

    /* mkdir mp3 ogg webm; for i in *.wav; do ffmpeg -i "$i" -b:a 320000 "./mp3/${i%.*}.mp3" -b:a 320000 "./ogg/${i%.*}.ogg" "./flac/${i%.*}.flac"; done
    batch converts wavs to diff formats */


    /* set this up so that it can be sent along to recorder
    we use a masterbus here! */
    this.audioContext = new Tone.Context()
    Tone.setContext(this.audioContext)
    this.recordDest = this.audioContext.createMediaStreamDestination() // this is how we make a media stream to record
    this.masterBus = new Tone.Gain().connect(this.recordDest).toMaster() // and this is how we feed it the master bus, simultaneously hooking it to speakers

    Tone.Transport.bpm.value = bpm;

    this.sounds = new Tone.Players({
      "root1" : "./sounds/mp3/root1.mp3",
      "root2" : "./sounds/mp3/root2.mp3",
      "root3" : "./sounds/mp3/root3.mp3",
      "melody1" : "./sounds/mp3/melody1.mp3",
      "melody2" : "./sounds/mp3/melody2.mp3",
      "melody3" : "./sounds/mp3/melody3.mp3",
      "melody4" : "./sounds/mp3/melody4.mp3",
      "fifth1" : "./sounds/mp3/fifth1.mp3"
    }, () => this.loadCall()
    ).connect(this.masterBus)
    this.sounds.fadeOut = "4n"
    // this.sounds.fadeIn = "@16n"

    this.reverb = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.02
    }).connect(this.masterBus);
    this.reverb.generate();

    this.lowpass = new Tone.Filter(800, "lowpass", -12).connect(this.reverb);

    this.mod1 = new Tone.LFO("4m", 600, 800);
    this.mod1.connect(this.lowpass.frequency);

    this.droneOsc1 = new Tone.Noise({
      type : "white" ,
      playbackRate : 1,
    }).connect(this.lowpass);
    this.droneOsc1.volume.value = -16;
  }

  loadCall() {
    console.log('buffers loaded')
    this.props.onLoad()
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

    /* sound feedback — make interesting events happen at 1 to 2, 2 to 3, 3 to 4 */

    if (playState) {
      Tone.Transport.start('+.05'); // delaying transport start helps with audio dropouts on mobile
      this.droneOsc1.start('@16n');
      this.mod1.start();
      if (currUsers === 1) {

      }
      if (currUsers === 1 && !increasing) {
        this.sounds.get("root1").stop("@16n");
      }
      if (currUsers === 2 && increasing) {
        this.sounds.get("root1").loop = true; 
        this.sounds.get("root1").start("@16n");
      }
      if (currUsers === 2 && !increasing) {
        this.sounds.get("melody1").stop("@16n");
      }
      if (currUsers === 3 && increasing) {
        this.sounds.get("melody1").loop = true; 
        this.sounds.get("melody1").start("@16n");
      }
      if (currUsers === 3 && !increasing) {
        this.sounds.get("melody2").stop("@16n");
      }
      if (currUsers === 4 && increasing) {
        this.sounds.get("melody2").loop = true; 
        this.sounds.get("melody2").start("@16n");
      }
      if (currUsers === 4 && !increasing) {
        this.sounds.get("melody3").stop("@16n");
      }
      if (currUsers === 5 && increasing) {
        this.sounds.get("melody3").loop = true; 
        this.sounds.get("melody3").start("@16n");
      }
      if (currUsers === 5 && !increasing) {
        this.sounds.get("melody4").stop("@16n");
      }
      if (currUsers === 6 && increasing) {
        this.sounds.get("melody4").loop = true; 
        this.sounds.get("melody4").start("@16n");
      }
    }
  }

  render() {
    if (this.props.loadState === true) {
      return (
        <LoadButton>loading...</LoadButton>
      )
    }
    else if (this.props.loadState === false) {
      return (
        <Recorder
          onClick={this.props.onClick}
          playState={this.props.playState}
          recordState={this.props.recordState}
          recordDest={this.recordDest}
        />
      )
      // return null
    }

    // return null
  }
}