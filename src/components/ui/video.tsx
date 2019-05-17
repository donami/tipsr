import React, { useEffect } from 'react';
import styled from '../../lib/styledComponents';
import YouTubePlayer from 'youtube-player';
import Icon from '@/components/ui/icon';

type Props = { video: any };
const Video: React.SFC<Props> = ({ video }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let player;

      player = YouTubePlayer(`video-player-${video.id}`, {
        // videoId: video.key,
        width: 400,
        height: 250,
      });

      // 'loadVideoById' is queued until the player is ready to receive API calls.
      player.loadVideoById(video.key);

      // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
      player.playVideo();

      // 'stopVideo' is queued after 'playVideo'.
      player.stopVideo().then(() => {
        // Every function returns a promise that is resolved after the target function has been executed.
      });
    }
  }, []);

  return (
    <Wrapper>
      <Thumb>
        <div id={`video-player-${video.id}`} />
      </Thumb>
      <Content>
        <Top>
          <h4>{video.name}</h4>
          <Icon icon="film" />
        </Top>
        <Meta>
          {video.type} • {video.size}p
        </Meta>
      </Content>
    </Wrapper>
  );
};

export default Video;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};
  border-radius: 4px;
  margin-bottom: ${props => props.theme.spacing.normal};
  display: flex;
`;
const Thumb = styled.div`
  flex: 1;
  max-width: 400px;
  margin-right: ${props => props.theme.spacing.normal};
`;
const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.normal};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Meta = styled.div``;
