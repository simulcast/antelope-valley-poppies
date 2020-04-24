import React from 'react';
import { Player, ControlBar, BigPlayButton } from 'video-react';
import HLSSource from './HLSSource'
import styled from 'styled-components';
import "../node_modules/video-react/dist/video-react.css";

/* a wrapper for the video stream of the poppies
uses video-react to stream in the video, HLSSource
to specify the livestream protocol */


const VideoWrapper = styled.div`
  position: absolute;
  width: 80%;
  filter: drop-shadow(15px 10px 5px var(--poppy));
  @media only screen and (max-width: 813px) {
    /* For mobile phones: */
    width: 70%;
  }
`;

export default class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.play = this.play.bind(this); // binding so that ref works
  }

  /* play method so that we can control media start */
  play() {
    this.player.play();
  }

  /* if state is playing, play the video on start call */
  componentDidUpdate() {
    if (this.props.playState) {
      this.player.play();
    }
  }

  render() {
    return(
      <VideoWrapper>
        <Player
          autoPlay = {false}
          fluid = {true}
          ref={player => {
            this.player = player;
          }} // ref so that we can call play on the class itself
        >
          <HLSSource
            isVideoChild
            src="https://video.parks.ca.gov/PoppyReserve/Poppies.stream/playlist.m3u8"
          />
          <ControlBar
            disableCompletely={true}
          >
          </ControlBar>
          <BigPlayButton />
        </Player>
      </VideoWrapper>
    )
  }
}