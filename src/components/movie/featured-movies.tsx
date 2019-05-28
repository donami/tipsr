import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import movies from '@/queries/movies';
import Poster from './poster';
import HorizontalList from '../ui/horizontal-list';
import styled, { css } from '../../lib/styledComponents';
import { slugify } from '@/lib/helpers';
import MovieGenres from './movie-genres';

type Props = {
  vertical?: boolean;
};
const FeaturedMovies: React.SFC<Props> = ({ vertical = false }) => {
  return (
    <Query query={movies} variables={{ featured: true }}>
      {({ data, loading }) => {
        return (
          <HorizontalList
            items={data.movies}
            vertical={vertical}
            title="Featured Movies"
            loading={loading}
            renderItem={(item: any) => {
              return (
                <>
                  <div>
                    <Poster image={item.poster} small />
                  </div>
                  <div>
                    <Link to={`/movie/${item.id}-${slugify(item.title)}`}>
                      {item.title}
                    </Link>
                    <StyledMovieGenres genres={item.genres} />
                    <MovieDescription vertical={vertical}>
                      {item.description}
                    </MovieDescription>
                  </div>
                </>
              );
            }}
          />
        );
      }}
    </Query>
  );
};

export default FeaturedMovies;

const MovieDescription = styled.p<{ vertical: boolean }>`
  ${props => {
    if (props.vertical) {
      return css`
        display: none;
        @media (max-width: 960px) {
          display: block;
        }
      `;
    }
    return null;
  }}
`;

const StyledMovieGenres = styled(MovieGenres)`
  span {
    color: #999 !important;
  }
`;
