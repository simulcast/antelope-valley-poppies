import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Modal = styled.div`
  position: fixed;
  display: flex;
  align-self: center;
  justify-content: center;
  z-index: 1;
  width: 50%;
  height: 200px;
  font-size: .75em;
  padding: 40px;
  ${'' /* background: linear-gradient(var(--skyblue), var(--skyblue)), linear-gradient(white, white); */}
  overflow: scroll;;
  font-weight: bold;
  color: var(--darkblue);
`

const StartButton = styled.button`
  background: linear-gradient(var(--darkblue), var(--darkblue)), linear-gradient(white, white);
  font-family: "Space Mono", monospace;
  font-size: 1.2em;
  font-weight: 700;
  color: white;
  text-decoration: none;
  padding: 20px;
  display: inline-block;
  transition: all 0.4s ease 0s;
  cursor: pointer;
  text-align: center;
  align-self: center;
  margin: 0 auto;
  display: block;
  width: 20%;

  &:hover {
    color: #ffffff !important;
    background: linear-gradient(var(--poppy), var(--poppy)), linear-gradient(white, white);
    ${'' /* background: var(--poppy); */}
    transition: all 0.4s ease 0s;
  }

  @media only screen and (max-width: 812px) {
    /* For mobile phones: */
    ${'' /* align-self: bottom; */}
    width: 200px;
  }
`

const text = `
  every spring in the antelope valley, poppies bloom orange.\n
  when it's sunny, they open up and reach towards the light.
  when it's cloudy, they turn inwards.\n
  it's usually nice to visit with a friend, but this year, we're left alone.\n
  knowing this, the california parks department set up a webcam.\n
  it's beautiful, but it's quiet.
  so let's make some sound.\n
  just like the poppies, the score here responds to its surroundings.\n
  the more of us there are, the sunnier it becomes.\n
`

const About = (props) => {
  if (!props.playState) {
    return (
      <Modal>
        {/* <ReactMarkdown source={text} /><br></br> */}
        <StartButton onClick={props.onClick}>start</StartButton>
      </Modal>
    )
  }
  else {
    return null
  }
}

export default About;