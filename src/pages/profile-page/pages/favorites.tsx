import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import favorites from '@/queries/favorites';
import Loader from '@/components/ui/loader';
import Heading from '@/components/ui/heading';
import MovieList from '../../../components/movie/movie-list';

type Props = {};
const FavoritePage: React.SFC<Props> = () => {
  return (
    <div>
      <Heading as="h3">Your favorites</Heading>

      <Query query={favorites}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          return (
            <Fragment>
              {data.favorites.length && <MovieList movies={data.favorites} />}

              {!data.favorites.length && <em>No favorites added yet.</em>}
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default FavoritePage;
