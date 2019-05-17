import React from 'react';
import styled from '@/lib/styledComponents';
import { Link } from 'react-router-dom';
import ActionButton from '@/components/ui/action-button';
import Icon from '@/components/ui/icon';
import Poster from '@/components/movie/poster';

type Props = { movie: any };
const MovieItem: React.SFC<Props> = ({ movie }) => {
  return (
    <Wrapper key={movie.id}>
      <div className="movie-poster-container">
        <Poster image={movie.poster} small />
      </div>
      <div className="movie-item-info-container">
        <h5>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h5>
        <p>
          A darkness swirls at the center of a world-renowned dance company, one
          that will engulf the artistic director, an ambitious young dancer, and
          a grieving psychotherapist. Some will succumb to the nightmare. Others
          will finally wake up.
        </p>
        <div>
          <ActionButton
            onClick={async () => {
              const added = await mutate({
                variables: {
                  movieId: movie.id,
                },
              });
            }}
          >
            <Icon icon={['far', 'heart']} />
          </ActionButton>
          <ActionButton as={Link} to={`/movie/${movie.id}`}>
            View details
          </ActionButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default MovieItem;

const Wrapper = styled.div`
  display: flex;
  background-color: #2e2e2e;
  margin-bottom: ${props => props.theme.spacing.normal};
  padding: ${props => props.theme.spacing.normal};

  .movie-poster-container {
    min-width: 120px;
    max-width: 120px;
  }

  .movie-item-info-container {
    margin-left: ${props => props.theme.spacing.normal};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h5 {
      font-size: 1em;
    }

    p {
      margin: ${props => props.theme.spacing.normal} 0;
      font-size: 0.9em;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
