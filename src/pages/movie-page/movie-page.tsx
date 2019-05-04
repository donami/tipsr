import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import { Query, Mutation } from 'react-apollo';
import movie from '../../queries/movie';
import Loader from '../../components/ui/loader';
import { RouteComponentProps, Link, Redirect } from 'react-router-dom';
import Heading from '../../components/ui/heading';
import similar from '../../queries/similar';
import Poster from '../../components/movie/poster';
import AddToList from '../../components/lists/add-to-list';
import Rating from '../../components/ui/rating';
import addExternalMovie from '../../mutations/add-external-movie';
import movies from '../../queries/movies';

const GetExternalMovie: React.SFC<any> = ({ externalId, mutate }) => {
  const [addedMovieId, setAddedMovieId] = useState(null);

  useEffect(() => {
    mutate({
      variables: {
        externalId: +externalId,
      },
    }).then(results => {
      if (
        results &&
        results.data.addExternalMovie &&
        results.data.addExternalMovie.movie
      ) {
        setAddedMovieId(results.data.addExternalMovie.movie.id);
      }
    });
  }, []);

  if (addedMovieId) {
    return <Redirect to={`/movie/${addedMovieId}`} />;
  }

  return <Loader />;
};

type Props = {} & RouteComponentProps<{ id: string; external: string }>;
const MoviePage: React.SFC<Props> = ({ match }) => {
  return (
    <DefaultLayout>
      <h3>Movie Page</h3>
      {!!match.params.external && (
        <Mutation
          mutation={addExternalMovie}
          update={(proxy, { data: { addExternalMovie } }) => {
            try {
              const data: any = proxy.readQuery({ query: movies });
              proxy.writeQuery({
                query: movies,
                data: {
                  ...data,
                  movies: data.movies.concat(addExternalMovie.movie),
                },
              });
            } catch (error) {}
          }}
        >
          {mutate => (
            <GetExternalMovie externalId={match.params.id} mutate={mutate} />
          )}
        </Mutation>
      )}
      {!match.params.external && (
        <Query query={movie} variables={{ id: +match.params.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <Loader />;
            }

            if (!data.movie) {
              return <em>Oops, this page does not exist.</em>;
            }
            return (
              <div>
                <Heading as="h2">{data.movie.title}</Heading>
                <Rating voteAverage={data.movie.voteAverage} />
                <AddToList movieId={data.movie.id} />
                <Query
                  query={similar}
                  variables={{ externalId: data.movie.externalId }}
                >
                  {({ data: similarData, loading: similarLoading }) => {
                    if (similarLoading) {
                      return <Loader />;
                    }

                    if (!similarData.similar) {
                      return null;
                    }

                    return (
                      <div>
                        {similarData.similar.map((item: any, index: number) => {
                          let link = '';

                          if (item.id === item.externalId) {
                            link = `/movie/${item.id}/true`;
                          } else {
                            link = `/movie/${item.id}`;
                          }
                          return (
                            <div key={index}>
                              <Poster image={item.poster} small />
                              <Link to={link}>{item.title}</Link>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      )}
    </DefaultLayout>
  );
};

export default MoviePage;
