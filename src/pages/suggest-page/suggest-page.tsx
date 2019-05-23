import React, { useState } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import Loader from '@/components/ui/loader';
import suggest from '@/queries/suggest';
import favorites from '@/queries/favorites';
import Poster from '@/components/movie/poster';
import styled, { css } from '@/lib/styledComponents';
import { useModal } from '@/components/modal';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Field from '@/components/ui/field';
import Icon from '@/components/ui/icon';
import ActionButton from '@/components/ui/action-button';
import Modal from '@/components/modal/modal';
import SimilarMovies from '@/components/movie/similar-movies';
import { getReleaseYear } from '@/lib/helpers';
import genres from '../../queries/genres';
import addFavorite from '@/mutations/add-favorite';
import { useToasts } from '@/components/toasts/toast-manager';
import { default as AddFavoriteAction } from '@/components/movie/add-favorite';

type Filters = {
  startYear: string;
  endYear: string;
  minRating: number;
  genre: number[];
};

const SuggestFilters: React.SFC<{
  onSetFilters: (filters: Filters) => void;
}> = ({ onSetFilters }) => {
  const currentDate = new Date();
  const [values, setValues] = useState<Filters>({
    startYear: '1900',
    endYear: new Date().getFullYear().toString(),
    minRating: 5,
    genre: [],
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        onSetFilters(values);
      }}
    >
      <Field>
        <label>Start Year</label>
        <Input
          type="number"
          defaultValue={+values.startYear}
          onChange={e => {
            setValues({
              ...values,
              startYear: e.target.value,
            });
          }}
        />
      </Field>
      <Field>
        <label>End Year</label>
        <Input
          type="text"
          defaultValue={+values.endYear}
          onChange={e => {
            setValues({
              ...values,
              endYear: e.target.value,
            });
          }}
        />
      </Field>
      <Field>
        <label>Minimum rating</label>
        <Input
          type="number"
          min={0}
          max={10}
          defaultValue={values.minRating}
          onChange={e => {
            setValues({
              ...values,
              minRating: +e.target.value,
            });
          }}
        />
      </Field>
      <Field>
        <label>Genres</label>
        <select
          onChange={e => {
            if (+e.target.value <= 0) {
              setValues({
                ...values,
                genre: [],
              });
            } else {
              setValues({
                ...values,
                genre: [+e.target.value],
              });
            }
          }}
        >
          <option value={-1}>All genres...</option>
          <Query query={genres}>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }
              if (!data.genres) {
                return null;
              }
              return data.genres.map(genre => (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              ));
            }}
          </Query>
        </select>
      </Field>
      <Button type="submit" primary>
        Set filters
      </Button>
    </form>
  );
};

type Props = {};
const SuggestPage: React.SFC<Props> = () => {
  const [filters, setFilters] = useState({
    startYear: '',
    endYear: '',
    minRating: 0,
    genre: [],
  });

  const { add } = useToasts();

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Filter suggestions">
        <SuggestFilters
          onSetFilters={filters => {
            setFilters(filters);
          }}
        />
      </Modal>
    );
  });

  return (
    <DefaultLayout>
      <Query query={suggest} variables={{ filters }}>
        {({ data, loading, refetch }) => {
          if (loading) {
            return <Loader />;
          }

          const { movie } = data.suggest;

          if (!movie) {
            return <p>No movie found...</p>;
          }

          const releaseYear = getReleaseYear(movie.releaseDate);

          return (
            <Wrapper>
              {movie.backdropPath && (
                <Backdrop image={movie.backdropPath}>
                  <div className="suggest-buttons">
                    <Button
                      onClick={showModal}
                      circular
                      icon
                      title="Set filters"
                    >
                      <Icon icon="filter" />
                    </Button>
                    <Button
                      title="Suggest another movie"
                      circular
                      icon
                      onClick={() => {
                        refetch();
                      }}
                    >
                      <Icon icon="random" />
                    </Button>
                  </div>
                  <div className="backdrop-content">
                    <div>
                      <div>
                        <Poster image={movie.poster} large />
                      </div>
                      <div>
                        <h2 className="title">
                          {movie.title}{' '}
                          <span className="year">({releaseYear})</span>
                        </h2>

                        {movie.genres && !!movie.genres.length && (
                          <div className="genres">
                            {movie.genres.map((genre: any, index: number) => (
                              <span key={genre.id}>
                                {index !== movie.genres.length - 1
                                  ? genre.name.concat(', ')
                                  : genre.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="description">{movie.description}</p>

                        <div>
                          <AddFavoriteAction>
                            {({ mutate, add }: any) => {
                              return (
                                <ActionButton
                                  onClick={async () => {
                                    await mutate({
                                      variables: {
                                        movieId: movie.id,
                                      },
                                    });
                                    add({
                                      type: 'success',
                                      message: 'Favorite added',
                                    });
                                  }}
                                >
                                  <Icon icon={['far', 'heart']} />
                                </ActionButton>
                              );
                            }}
                          </AddFavoriteAction>
                          <ActionButton
                            onClick={async () => {
                              // const added = await mutate({
                              //   variables: {
                              //     movieId: movie.id,
                              //   },
                              // });
                            }}
                          >
                            <Icon icon="plus" />
                          </ActionButton>
                          <ActionButton as={Link} to={`/movie/${movie.id}`}>
                            View more...
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </Backdrop>
              )}
              <div className="suggest-similar">
                <SimilarMovies externalId={movie.externalId} />
              </div>
            </Wrapper>
          );
        }}
      </Query>
    </DefaultLayout>
  );
};

export default SuggestPage;

const Wrapper = styled.div`
  .suggest-similar {
    background-color: #2e2e2e;
    padding: ${props => props.theme.spacing.normal};
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Backdrop = styled.div<{ backdropPath: string }>`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.normal};
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: block;
    /* filter: opacity(100) grayscale(100%) contrast(130%); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-image: url(${props => props.image});
    will-change: opacity;
    transition: filter 1s;
  }

  .suggest-buttons {
    position: absolute;
    right: 20px;
    top: 20px;
    > button {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .title {
    font-size: 1.8em;
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: ${props => props.theme.spacing.normal};
  }
  .genres {
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: ${props => props.theme.spacing.normal};
  }
  .description {
    max-width: 60%;
    margin-bottom: ${props => props.theme.spacing.normal};
  }
  .year {
    opacity: 0.8;
  }

  .backdrop-content {
    min-height: 450px;

    img {
      max-width: 148px;
    }

    > div {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      /* background-color: rgba(232, 236, 241, 0.2); */
      background-color: rgba(0, 0, 0, 0.6);

      @media (max-width: 600px) {
        position: unset;
        flex-wrap: wrap;
      }

      > div {
        margin-right: 20px;
      }
    }
  }
`;
