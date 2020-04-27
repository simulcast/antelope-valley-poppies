import React from 'react'
import styled from 'styled-components'
import download from 'downloadjs'
import lamejs from 'lamejs'
import FileReader from 'filereader'
// import AudioRecorder from 'audio-recorder-polyfill'

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
    this.startRecord = this.startRecording.bind(this);
    this.stopRecord = this.stopRecording.bind(this);
    this.recorder = new MediaRecorder(this.props.recordDest.stream);
    this.chunks = [];
  }

  startRecording() {
    this.recorder.start()
    this.recorder.ondataavailable = evt => this.chunks.push(evt.data);
  }
   
  async stopRecording() {
    this.recorder.stop()
    this.recorder.onstop = evt => {
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        let blob = new Blob(this.chunks, { type: 'audio/webm; codecs=opus' })
        console.log(blob)
        download(blob, "export.webm", "audio/webm")
      }
      else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        let blob = new Blob(this.chunks, { type: 'wudio/ogg; codecs=opus'})
        console.log(blob)
        download(blob, "export.ogg", "audio/ogg")
      }
    };
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