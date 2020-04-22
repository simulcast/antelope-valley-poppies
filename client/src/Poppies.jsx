import React from 'react'
import styled from 'styled-components'
import About from './About'
import VideoPlayer from './VideoPlayer'
import Sockets from './Sockets'

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
      started: false
    }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick() {
    this.setState({
      started: true
    })
  }

  render() {
    const playState = this.state.started
    return (
      <Container>
        <About
          onClick={this.handleClick}
          playState={playState}
        />
        <VideoPlayer 
          playState={playState}
        />
        <Sockets 
          playState={playState}
        />
      </Container>
    )
  }
}