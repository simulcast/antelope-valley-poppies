import React from 'react';
import styled from 'styled-components';

/* this is the start button class
it inherits the startClick() method from Poppies as a prop
render is conditional on playState, so that when we start playing the button disappears */

const StartContainer = styled.div`
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
  border: 0px;

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

const Start = (props) => {
  if (!props.playState && !props.loadState) {
    return (
      <StartContainer>
        <StartButton onClick={props.onClick}>start</StartButton>
      </StartContainer>
    )
  }
  else {
    return null
  }
}

export default Start;