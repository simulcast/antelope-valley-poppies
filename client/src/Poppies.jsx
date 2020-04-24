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
      recording: false
    }

    /* method bindings */
    this.startClick = this.startClick.bind(this)
    this.recordClick = this.recordClick.bind(this)

  }
  
  /* called when user clicks start button */
  startClick() {
    this.setState({
      started: true,
      recording: false
    })
  }

  /* called when user clicks record button */
  recordClick() {
    if (this.state.recording === false) {
      this.setState({
        started: true,
        recording: true
      })
    }
    else if (this.state.recording === true) {
      this.setState({
        started: true,
        recording: false
      })
    }
  }

  render() {
    const playState = this.state.started
    const recordState = this.state.recording
    return (
      <Container>
        <Start
          onClick={this.startClick}
          playState={playState}
        />
        <About
          playState={playState}
        />
        <VideoPlayer 
          playState={playState}
        />
        <Sockets
          onClick={this.recordClick}
          playState={playState}
          recordState={recordState}
        />
      </Container>
    )
  }
}