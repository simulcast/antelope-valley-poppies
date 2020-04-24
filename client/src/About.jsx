import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

/* this class is for the about modal, which uses the reactjs-popup plug-in
its render is conditional on playState, so that it only appears after start */

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
    @media only screen and (max-width: 812px) {
    /* For mobile phones: */
      font-size: 0.5em;
      padding: 20px !important;
    }
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
  @media only screen and (max-width: 812px) {
    /* For mobile phones: */
    top: auto;
    bottom: 0px;
    width: auto;
    height: auto;
  }
`
const About = (props) => {
  // console.log(props.playState)
  if (props.playState) {
    return (
      <AboutPopUp
        trigger={<AboutButton> about </AboutButton>}
        modal
        closeOnDocumentClick
      >
        <p><span class="accent">every spring in the antelope valley, poppies bloom orange.</span></p>
        <p>when it's sunny, they open up and reach towards the light. when it's cloudy, they turn inwards.</p>
        <p>it's usually nice to visit with a friend, but this year, we're left alone.</p>
        <p>knowing this, the california parks department set up a webcam. it's beautiful, but it's quiet.</p>
        <p><span class="accent">just like the poppies, the sounds here respond to their surroundings.</span></p>
        <p>the more of us there are, the less desolate it becomes.</p>
        <br></br>
        <p>design + dev by <a href="https://tristanfriedbergrodman.com" rel="noopener noreferrer" target="_blank">tristan friedberg rodman</a>. sounds by <a href="https://nevercontent.org/" rel="noopener noreferrer" target="_blank">noah klein</a>.</p>
      </AboutPopUp>
    )
  }
  else {
    return null
  }
}

export default About