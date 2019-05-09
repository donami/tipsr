import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import favorites from '@/queries/favorites';
import Loader from '@/components/ui/loader';
import MovieItem from '@/components/movie/movie-item';
import Heading from '@/components/ui/heading';

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
              {data.favorites.length && (
                <div>
                  {data.favorites.map((favorite: any) => (
                    <MovieItem key={favorite.id} movie={favorite}>
                      <Link to={`/movie/${favorite.id}`}>{favorite.title}</Link>
                    </MovieItem>
                  ))}
                </div>
              )}

              {!data.favorites.length && <em>No favorites added yet.</em>}
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default FavoritePage;
