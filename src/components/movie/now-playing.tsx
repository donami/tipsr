import React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../lib/styledComponents';
import { Query } from 'react-apollo';
import nowPlayingQuery from '@/queries/now-playing';
import Loader from '@/components/ui/loader';

type Props = { className?: string };
const NowPlaying: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper className={className || 'now-playing'}>
      <h3>Now Playing</h3>
      <Query query={nowPlayingQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          const movies = data.nowPlaying && data.nowPlaying.movies.slice(0, 3);

          return (
            <Movies>
              {movies.map((movie: any, index: number) => (
                <Movie image={movie.backdropPath} key={index}>
                  <Description>
                    <Link to={`/movie/${movie.id}/true`}>{movie.title}</Link>
                  </Description>
                </Movie>
              ))}
            </Movies>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default NowPlaying;

const Wrapper = styled.div`
  width: 100%;
`;

const Movies = styled.div`
  height: 500px;
  display: flex;
  flex-wrap: wrap;

  > div {
    flex: 1;
    min-width: 50%;
  }
`;
const Movie = styled.div<{ image: string }>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${props => props.image});
  position: relative;
`;

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #2e2e2e;
  width: 80%;
  font-weight: 300;
  text-transform: uppercase;
  padding: ${props => props.theme.spacing.normal};
  transition: all 200ms ease-in-out;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;
