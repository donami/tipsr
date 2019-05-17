import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import { Query, Mutation } from 'react-apollo';
import movie from '../../queries/movie';
import addFavorite from '../../mutations/add-favorite';
import Loader from '../../components/ui/loader';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import Heading from '../../components/ui/heading';
import AddToList from '../../components/lists/add-to-list';
import Rating from '../../components/ui/rating';
import Icon from '../../components/ui/icon';
import ActionButton from '../../components/ui/action-button';
import addExternalMovie from '../../mutations/add-external-movie';
import movies from '../../queries/movies';
import styled from '../../lib/styledComponents';
import SimilarMovies from '../../components/movie/similar-movies';
import { useModal } from '@/components/modal';
import Modal from '../../components/modal/modal';
import MovieReviews from '../../components/movie/movie-reviews';
import videos from '../../queries/videos';
import Video from '../../components/ui/video';

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
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Add to List">
        <AddToList movieId={+match.params.id} />
      </Modal>
    );
  });

  return (
    <DefaultLayout>
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
                <Top className="movie-top">
                  <div className="left">
                    <img src={data.movie.poster} alt="" />
                  </div>
                  <div className="movie-top-right">
                    <Heading as="h2" className="movie-top-right-title">
                      {data.movie.title}
                    </Heading>

                    <Rating
                      className="movie-top-right-rating"
                      voteAverage={data.movie.voteAverage}
                    />

                    <div className="movie-top-right-description">
                      <Heading as="h3">Overview</Heading>
                      <p>{data.movie.description}</p>
                    </div>

                    <div className="movie-top-right-action-buttons">
                      <Mutation mutation={addFavorite}>
                        {mutate => (
                          <ActionButton
                            onClick={async () => {
                              await mutate({
                                variables: {
                                  movieId: data.movie.id,
                                },
                              });
                            }}
                          >
                            <Icon icon={['far', 'heart']} />
                          </ActionButton>
                        )}
                      </Mutation>
                      <ActionButton onClick={showModal}>
                        Add to list...
                      </ActionButton>
                    </div>
                  </div>
                </Top>
                <SimilarMovies externalId={data.movie.externalId} />
                <MovieReviews
                  movieId={data.movie.id}
                  externalId={data.movie.externalId}
                />
                <div>
                  <h3>Videos</h3>
                  <Query
                    query={videos}
                    variables={{ externalMovieId: data.movie.externalId }}
                  >
                    {({ data, loading }) => {
                      if (loading) {
                        return <Loader />;
                      }

                      console.log(data);
                      if (!data.videos || !data.videos.videos.length) {
                        return null;
                      }

                      return (
                        <>
                          {data.videos.videos.map(
                            (video: any, index: number) => (
                              <Video video={video} key={index} />
                            )
                          )}
                        </>
                      );
                    }}
                  </Query>
                </div>
              </div>
            );
          }}
        </Query>
      )}
    </DefaultLayout>
  );
};

export default MoviePage;

const Top = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.large};

  .left {
    min-width: 30%;

    img {
      max-width: 100%;
    }
  }

  .movie-top-right {
    margin-left: ${props => props.theme.spacing.large};

    h3,
    &-title,
    &-description,
    &-rating {
      margin-bottom: ${props => props.theme.spacing.normal};
    }
  }
`;
