import React from 'react'
import styled from 'styled-components'
import RecorderJS from './utilities/recorder.js'
import download from 'downloadjs'

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
*/

export default class Recorder extends React.Component {
  constructor(props) {
    super(props)
    this.startRecord = this.startRecording.bind(this);
    this.stopRecord = this.stopRecording.bind(this);
    
    this.recorder = new RecorderJS(this.props.context.createBufferSource())
  }

  startRecording() {
    this.recorder.record()
  }
   
  async stopRecording() {
    console.log('stop recording')
    this.recorder.stop()
    this.recorder.exportWAV(function(blob){
      console.log(blob);
      download(blob, "export.wav", "audio/wav");
    });
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