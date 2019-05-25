import React from 'react';
import { Query } from 'react-apollo';
import movies from '@/queries/movies';
import Loader from '@/components/ui/loader';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '../../components/ui/heading';
import MovieItem from '../../components/movie/movie-item';

const BrowsePage = () => {
  return (
    <Query query={movies}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />;
        }
        return (
          <DefaultLayout>
            <Heading sectionTitle>Movies</Heading>
            {data.movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </DefaultLayout>
        );
      }}
    </Query>
  );
};

export default BrowsePage;
