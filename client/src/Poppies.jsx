import React from 'react'
import styled from 'styled-components'
import Start from './Start'
import About from './About'
import VideoPlayer from './VideoPlayer'
import Sockets from './Sockets'

/* this is the main class
it keeps track of whether the app has started and
whether recording is engaged via its state
*/

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(var(--skyblue-plus), var(--skyblue));
  color: var(--darkblue)
`

export default class Poppies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      started: false,
      recording: false,
      loading: true
    }

    /* method bindings */
    this.startClick = this.startClick.bind(this)
    this.recordClick = this.recordClick.bind(this)
    this.onLoad = this.onLoad.bind(this)

  }
  
  /* called when user clicks start button */
  startClick() {
    this.setState({
      started: true,
      recording: this.state.recording,
      loading: this.state.loading
    })
  }

  /* called when user clicks record button */
  recordClick() {
    if (this.state.recording === false) {
      this.setState({
        started: this.state.started,
        recording: true,
        loading: this.state.loading
      })
    }
    else if (this.state.recording === true) {
      this.setState({
        started: this.state.started,
        recording: false,
        loading: this.state.loading
      })
    }
  }

  onLoad() {
    this.setState({
      started: this.state.started,
      recording: this.state.recording,
      loading: false
    })
  }

  render() {
    const playState = this.state.started
    const recordState = this.state.recording
    const loadState = this.state.loading
    return (
      <Container>
        <Start
          onClick={this.startClick}
          playState={playState}
          loadState={loadState}
        />
        <About
          playState={playState}
        />
        <VideoPlayer 
          playState={playState}
        />
        <Sockets
          onClick={this.recordClick}
          onLoad={this.onLoad}
          playState={playState}
          loadState={loadState}
          recordState={recordState}
        />
      </Container>
    )
  }
}