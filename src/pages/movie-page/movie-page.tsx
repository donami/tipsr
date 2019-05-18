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
import styled, { css } from '../../lib/styledComponents';
import SimilarMovies from '../../components/movie/similar-movies';
import { useModal } from '@/components/modal';
import Modal from '../../components/modal/modal';
import MovieReviews from '../../components/movie/movie-reviews';
import VideoList from '../../components/movie/video-list';

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
  const [activeTab, setActiveTab] = useState('reviews');

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Add to List">
        <AddToList movieId={+match.params.id} />
      </Modal>
    );
  });

  return (
    <DefaultLayout>
      <Wrapper>
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
                  <SimilarMovies
                    className="similar-movies"
                    externalId={data.movie.externalId}
                  />
                  <Bar>
                    <BarItem
                      current={activeTab === 'reviews'}
                      onClick={() => {
                        setActiveTab('reviews');
                      }}
                    >
                      Reviews
                    </BarItem>
                    <BarItem
                      current={activeTab === 'videos'}
                      onClick={() => {
                        setActiveTab('videos');
                      }}
                    >
                      Videos
                    </BarItem>
                  </Bar>
                  {activeTab === 'reviews' && (
                    <MovieReviews
                      movieId={data.movie.id}
                      externalId={data.movie.externalId}
                    />
                  )}
                  {activeTab === 'videos' && (
                    <VideoList externalMovieId={data.movie.externalId} />
                  )}
                </div>
              );
            }}
          </Query>
        )}
      </Wrapper>
    </DefaultLayout>
  );
};

export default MoviePage;

const Wrapper = styled.div`
  .similar-movies {
    margin-bottom: ${props => props.theme.spacing.large};
  }
`;

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

const Bar = styled.div`
  color: #0582ca;
  background: #daddd8;
  border-radius: 5px;
  margin-bottom: ${props => props.theme.spacing.large};
  padding: 0 ${props => props.theme.spacing.normal};
  border-bottom: #e2e2e2 2px solid;
`;

const BarItem = styled.div<{ current: boolean }>`
  padding: ${props => props.theme.spacing.normal};
  display: inline-block;
  margin-right: ${props => props.theme.spacing.normal};
  border-bottom: transparent 2px solid;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: -2px;
  transition: all 200ms ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #00A6FB;
    /* color: ${props => props.theme.colors.primary}; */
    cursor: pointer;
  }

  ${props => {
    if (props.current) {
      return css`
        color: #00A6FB;
        /* color: ${props => props.theme.colors.primary}; */
        border-bottom: #00A6FB 2px solid;
        /* border-bottom: ${props => props.theme.colors.primary} 2px solid; */
      `;
    }
    return null;
  }}
`;
