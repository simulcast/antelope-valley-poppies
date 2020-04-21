import React from 'react';
import { Player, ControlBar } from 'video-react';
import HLSSource from './HLSSource'
import styled from 'styled-components';
import "../node_modules/video-react/dist/video-react.css";


const VideoWrapper = styled.div`
  position: absolute;
  width: 80%;
  filter: drop-shadow(15px 10px 5px var(--poppy));
`;

const VideoPlayer = () => {
  return(
    <VideoWrapper>
      <Player fluid = {true}>
        <HLSSource
          isVideoChild
          src="https://video.parks.ca.gov/PoppyReserve/Poppies.stream/playlist.m3u8"
        />
        <ControlBar disableCompletely={true}>
        </ControlBar>
      </Player>
    </VideoWrapper>
  )
}

export default VideoPlayer;