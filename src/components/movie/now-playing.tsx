import React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../lib/styledComponents';
import { Query } from 'react-apollo';
import nowPlayingQuery from '@/queries/now-playing';
import Loader from '@/components/ui/loader';
import Heading from '../ui/heading';

type Props = { className?: string };
const NowPlaying: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper className={className || 'now-playing'}>
      <Heading sectionTitle>Now Playing</Heading>
      <Query query={nowPlayingQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          const movies = data.nowPlaying && data.nowPlaying.movies.slice(0, 3);

          return (
            <Movies>
              {movies.map((movie: any, index: number) => {
                let link = '';
                if (movie.id === movie.externalId) {
                  link = `/movie/${movie.id}/true`;
                } else {
                  link = `/movie/${movie.id}`;
                }
                return (
                  <Movie to={link} image={movie.backdropPath} key={index}>
                    <Description>
                      <div>{movie.title}</div>
                    </Description>
                  </Movie>
                );
              })}
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

  > div,
  > a {
    flex: 1;
    min-width: 50%;
  }
`;
const Movie = styled(Link)<{ image: string }>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${props => props.image});
  position: relative;
  display: block;
  color: #fff;

  &:hover {
    opacity: 0.8;
    color: ${props => props.theme.colors.primary} !important;
  }
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

  > div {
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;
