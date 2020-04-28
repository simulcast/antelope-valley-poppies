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

    this.state = {
      currUsers: this.props.currUsers,
      prevUsers: this.props.prevUsers
    }

    console.log(this.state.currUsers)

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

    this.sounds = [] // empty array into which we'll load Tone.Player objects 
    this.max = 10

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

    this.loadCall(); // simulate load call
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

    if (playState) {
      Tone.Transport.start('+.05'); // delaying transport start helps with audio dropouts on mobile
      this.droneOsc1.start('@16n');
      this.mod1.start();

      if (increasing) {
        for (let i = 1; i < currUsers; i++) {
          if (this.sounds[i] === undefined)  { // if the slot is empty
            this.sounds[i] = new Tone.Player('./sounds/ordered/' + i + '.mp3', () => { // load in a sound
              // this.sounds[i].volume = -6
              this.sounds[i].loop = true // make sure it loops
              this.sounds[i].start("@16n") // and start it on the nearest 16th note
            }).connect(this.reverb) // connect to the reverb node
          }
          else if (i <= this.max) { // if there's already a sound
            this.sounds[i].volume.rampTo(-6, "2n") // bring the volume back up
          }
          else { // if the slot is full but it
            console.log('err!')
          }
        }
      }

      else if (!increasing) {
        if (currUsers >= 1) { // if the usercount is decreasing, 
          this.sounds[currUsers].volume.rampTo(-Infinity, "2n") // bring the volume on that sound down
        }
      }
      else {
        console.log('err!')
      }
    }
    else {
      console.log('too many users - doing nothing')
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