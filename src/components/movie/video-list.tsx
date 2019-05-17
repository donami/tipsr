import React from 'react';
import { Query } from 'react-apollo';
import videos from '../../queries/videos';
import Video from '@/components/ui/video';
import Loader from '../ui/loader';
import styled from '../../lib/styledComponents';
import Heading from '../ui/heading';

type Props = {
  externalMovieId: number;
};
const VideoList: React.SFC<Props> = ({ externalMovieId }) => {
  return (
    <Wrapper>
      <Heading sectionTitle>Videos</Heading>
      <Query query={videos} variables={{ externalMovieId }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          if (!data.videos || !data.videos.videos.length) {
            return <p>No videos found...</p>;
          }

          return (
            <>
              {data.videos.videos.map((video: any, index: number) => (
                <Video video={video} key={index} />
              ))}
            </>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default VideoList;

const Wrapper = styled.div``;
