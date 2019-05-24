import React, { useEffect, useState, useContext } from 'react';
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
import updateMovie from '../../mutations/update-movie';
import movies from '../../queries/movies';
import styled, { css } from '../../lib/styledComponents';
import SimilarMovies from '../../components/movie/similar-movies';
import { useModal } from '@/components/modal';
import Modal from '../../components/modal/modal';
import MovieReviews from '../../components/movie/movie-reviews';
import VideoList from '../../components/movie/video-list';
import AppStateContext from '../../components/layout/app-state-context';
import MovieGenres from '../../components/movie/movie-genres';
import Button from '../../components/ui/button';
import { slugify } from '@/lib/helpers';

const GetExternalMovie: React.SFC<any> = ({ externalId, mutate }) => {
  const [addedMovie, setAddedMovie] = useState(null);

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
        setAddedMovie(results.data.addExternalMovie.movie);
      }
    });
  }, []);

  if (addedMovie) {
    return (
      <Redirect to={`/movie/${addedMovie.id}-${slugify(addedMovie.title)}`} />
    );
  }

  return <Loader />;
};

type Props = {} & RouteComponentProps<{ id: string; external: string }>;
const MoviePage: React.SFC<Props> = ({ match }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ featured: false });
  const { auth } = useContext(AppStateContext);

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
                        <MovieGenres genres={data.movie.genres || []} />
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
                        {auth && (
                          <ActionButton onClick={showModal}>
                            Add to list...
                          </ActionButton>
                        )}

                        {auth && isEditing && auth.role === 'SYSADMIN' && (
                          <Mutation mutation={updateMovie}>
                            {mutate => (
                              <>
                                <input
                                  defaultChecked={data.movie.featured}
                                  type="checkbox"
                                  onChange={e => {
                                    setForm({
                                      ...form,
                                      featured: e.target.checked,
                                    });
                                  }}
                                />
                                Featured
                                <Button
                                  type="button"
                                  primary
                                  onClick={async () => {
                                    await mutate({
                                      variables: {
                                        movieId: data.movie.id,
                                        featured: form.featured,
                                      },
                                    });
                                    setIsEditing(false);
                                  }}
                                >
                                  Save
                                </Button>
                              </>
                            )}
                          </Mutation>
                        )}
                      </div>
                    </div>
                    {auth && auth.role === 'SYSADMIN' && (
                      <div className="movie-top-actions">
                        <Button
                          type="button"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                      </div>
                    )}
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
                  <BarContent>
                    {activeTab === 'reviews' && (
                      <MovieReviews
                        movieId={data.movie.id}
                        externalId={data.movie.externalId}
                      />
                    )}
                    {activeTab === 'videos' && (
                      <VideoList externalMovieId={data.movie.externalId} />
                    )}
                  </BarContent>
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
  flex-wrap: wrap;

  .left {
    min-width: 180px;
    max-width: 180px;
    img {
      max-width: 100%;
    }

    @media (max-width: 600px) {
      min-width: 100%;
      max-width: 100%;

      img {
        max-width: 50%;
      }
    }
  }

  .movie-top-right {
    margin-left: ${props => props.theme.spacing.large};
    flex: 1;

    @media (max-width: 600px) {
      min-width: 100%;
      margin: ${props => props.theme.spacing.normal} 0;
    }

    h3,
    &-title,
    &-description,
    &-rating {
      margin-bottom: ${props => props.theme.spacing.normal};
    }
  }
`;

const Bar = styled.div`
  border-bottom: ${props => props.theme.colors.primary} 1px solid;
`;

const BarItem = styled.div<{ current: boolean }>`
  padding: ${props => props.theme.spacing.normal};
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }

  ${props => {
    if (props.current) {
      return css`
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
      `;
    }
    return null;
  }}
`;

const BarContent = styled.div`
  padding: 40px;
`;
