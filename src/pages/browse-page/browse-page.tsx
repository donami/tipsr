import React from 'react';
import { Query } from 'react-apollo';
import movies from '@/queries/movies';
import Loader from '@/components/ui/loader';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '../../components/ui/heading';
import MovieList from '../../components/movie/movie-list';

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
            <MovieList movies={data.movies || []} />
          </DefaultLayout>
        );
      }}
    </Query>
  );
};

export default BrowsePage;
