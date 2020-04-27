import React from 'react'
import styled from 'styled-components'
import download from 'downloadjs'
import AudioRecorder from 'audio-recorder-polyfill'
import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder'

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

    /* use the Audio Recorder polyfill so that we can do mp3 encoding, Safari support */
    AudioRecorder.encoder = mpegEncoder
    AudioRecorder.prototype.mimeType = 'audio/mpeg'
    window.MediaRecorder = AudioRecorder
    this.recorder = new AudioRecorder(this.props.recordDest.stream)

    this.chunks = [];
  }

  startRecording() {
    this.recorder.start()
    this.recorder.addEventListener('dataavailable', evt => {
      console.log('listening')
      this.chunks.push(evt.data)
    })
  }
   
  async stopRecording() {
    this.recorder.stop()
    this.recorder.addEventListener('stop', evt => {
      console.log('stopped')
      let blob = new Blob(this.chunks, { type: 'audio/mpeg' })
      console.log(blob)
      download(blob, "watching-the-poppies-export.mp3", "audio/mpeg")
      // this.chunks = [] // reset chunks
    })
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