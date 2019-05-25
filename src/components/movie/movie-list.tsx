import React from 'react';
import { Query } from 'react-apollo';
import MovieItem from './movie-item';
import favorites from '../../queries/favorites';

type Props = { movies: any };
const MovieList: React.SFC<Props> = ({ movies }) => {
  return (
    <Query query={favorites}>
      {({ data: { favorites }, loading }) => {
        if (loading) {
          return null;
        }

        return movies.map((movie: any) => (
          <MovieItem key={movie.id} favorites={favorites} movie={movie} />
        ));
      }}
    </Query>
  );
};

export default MovieList;
