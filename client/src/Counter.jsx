import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  position: fixed;
  left: 20px;
  top: 0px;
  width: auto;
  height: auto;
  color: var(--darkblue);
  background-color: var(--poppy);
  margin: 20px;
  font-size: 1.2em;
`;

const Counter = (props) => {
  // console.log(props.userCount)
  const userCount = props.userCount;
  let text;
  if (userCount === 1) {
    text = <span>you are watching the poppies by yourself</span>
  }
  else if (userCount === 2) {
    text = <span>you are watching the poppies with 1 other person</span>
  }
  else {
    let otherCount = userCount - 1;
    text = <span>you are watching the poppies with {otherCount} other people</span>
  }
  if (props.playState) {
    return (
      <CounterContainer>
        {text}
      </CounterContainer>
    )
  }
  else {
    return null
  }
}

export default Counter