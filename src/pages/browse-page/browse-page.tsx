import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import movies from '@/queries/movies';
import Loader from '@/components/ui/loader';
import Poster from '@/components/movie/poster';
import DefaultLayout from '@/components/layout/default-layout';
import addFavorite from '../../mutations/add-favorite';
import { Link } from 'react-router-dom';

const BrowsePage = () => {
  return (
    <div>
      <h3>Browse</h3>

      <Query query={movies}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          return (
            <DefaultLayout>
              <Mutation mutation={addFavorite}>
                {mutate => (
                  <Fragment>
                    {data.movies.map(movie => (
                      <div key={movie.id}>
                        <Poster image={movie.poster} small />
                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        <span
                          onClick={async () => {
                            const added = await mutate({
                              variables: {
                                movieId: movie.id,
                              },
                            });
                          }}
                        >
                          Add Favorite
                        </span>
                      </div>
                    ))}
                  </Fragment>
                )}
              </Mutation>
            </DefaultLayout>
          );
        }}
      </Query>
    </div>
  );
};

export default BrowsePage;
