import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const AboutPopUp = styled(Popup)`
  &-overlay {
  }
  &-content {
    font-family: 'Space Mono';
    overflow: scroll;
    padding: 40px !important;
    width: 70% !important;
    background: linear-gradient(var(--skyblue), var(--skyblue)), linear-gradient(white, white) !important;
    border: 0px !important;
  }
`
const AboutButton = styled.button`
  font-family: 'Space Mono';
  font-weight: 700;
  position: fixed;
  right: 0px;
  top: 0px;
  width: auto;
  height: auto;
  color: var(--darkblue);
  background-color: var(--poppy);
  margin: 20px;
  font-size: 1.2em;
  border: 0px;
  cursor: pointer;
`
const About = (props) => {
  console.log(props.playState)
  if (props.playState) {
    return (
      <AboutPopUp
        trigger={<AboutButton> about </AboutButton>}
        modal
        closeOnDocumentClick
      >
        <p>every spring in the antelope valley, poppies bloom orange.</p>
        <p>when it's sunny, they open up and reach towards the light. when it's cloudy, they turn inwards.</p>
        <p>it's usually nice to visit with a friend, but this year, we're left alone.</p>
        <p>knowing this, the california parks department set up a webcam.</p>
        <p>  it's beautiful, but it's quiet.</p>
        <p>  just like the poppies, the score here responds to its surroundings.</p>
        <p>the more of us there are, the sunnier it becomes.</p>
        <br></br>
        <p>design + dev by tristan friedberg rodman. sound by noah klein.</p>
      </AboutPopUp>
    )
  }
  else {
    return null
  }
}

export default About