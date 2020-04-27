import React from 'react'
import styled from 'styled-components'
import RecorderJS from './utilities/recorder.js'
import download from 'downloadjs'
import AudioRecorder from 'audio-recorder-polyfill'

const RecordButton = styled.button`
  font-family: 'Space Mono';
  font-weight: 700;
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  color: var(--darkblue);
  background-color: var(--poppy);
  margin: 20px;
  font-size: 1.2em;
  border: 0px;
  cursor: pointer;
  @media only screen and (max-width: 812px) {
    /* For mobile phones: */
    display: none /* don't display record button on mobile */
  }
`

/* currently:
properly records and downloads, but sound is empty!
is it the audio context?
can we rewrite with getmediastream?
https://codepen.io/jakealbaugh/pen/QVqgBE/
https://github.com/Tonejs/Tone.js/issues/224
try passing record.js a custom-built mix bus. the source needs to be a node!
https://github.com/Tonejs/tonejs.github.io/blob/master/examples/buses.html
if that works, then try the mediarecorder version to help in safari
https://github.com/ai/audio-recorder-polyfill
*/

export default class Recorder extends React.Component {
  constructor(props) {
    super(props)
    // window.MediaRecorder = AudioRecorder
    this.startRecord = this.startRecording.bind(this);
    this.stopRecord = this.stopRecording.bind(this);
    // console.log(this.props.audioContext)
    // console.log(this.props.masterBus)
    // console.log(this.props.recordDest.stream)
    this.recorder = new MediaRecorder(this.props.recordDest.stream);
    this.chunks = [];

    
    // this.recorder = new RecorderJS(this.props.masterBus) //mess around with this maybe? in an old prototype it used createGain(); you don't pass it the context - you pass it the gain node!
  }

  startRecording() {
    // this.recorder.record()
    this.recorder.start()
    this.recorder.ondataavailable = evt => this.chunks.push(evt.data);
  }
   
  async stopRecording() {
    console.log('stop recording')
    this.recorder.stop()
    this.recorder.onstop = evt => {
      let blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
      console.log(blob)
      download(blob, "export.ogg", "audio/ogg");
    };
    // audio.src = URL.createObjectURL(blob);
    // this.recorder.exportWAV(function(blob){
      // // console.log(blob);
      // download(blob, "export.wav", "audio/wav");
    // });
  }

  /* conditional render */
  render() {
    if (this.props.playState && !this.props.recordState) {
      return <RecordButton onClick={() => {this.props.onClick(); this.startRecording()}}>record</RecordButton> 
    }
    else if (this.props.playState && this.props.recordState) {
      return <RecordButton onClick={() => {this.props.onClick(); this.stopRecording()}}>download</RecordButton> 
    }
    else return null
  }
}