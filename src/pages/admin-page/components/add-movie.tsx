import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Field from '@/components/ui/field';
import Button from '@/components/ui/button';
import findMovies from '@/mutations/find-movies';
import addMovieMutation from '@/mutations/add-movie';
import { useToasts } from '@/components/toasts/toast-manager';

type Props = {};
const AddMovie: React.SFC<Props> = () => {
  const [title, setTitle] = useState('');
  const [results, setResults] = useState<any>(null);
  const { add } = useToasts();

  return (
    <div>
      <Mutation mutation={findMovies}>
        {(mutate, { loading }) => (
          <div>
            <h3>Add Movie</h3>
            <form
              onSubmit={async e => {
                e.preventDefault();

                const { data } = await mutate({
                  variables: {
                    title,
                  },
                });

                if (data && data.findMovies) {
                  setResults(data.findMovies);
                }
              }}
            >
              <Field>
                <label>Movie title</label>
                <input
                  type="text"
                  placeholder="Movie title"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                />
              </Field>
              <Button loading={loading} type="submit">
                Search
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setTitle('');
                  setResults(null);
                }}
              >
                Reset
              </Button>
            </form>
          </div>
        )}
      </Mutation>

      {results && (
        <Fragment>
          {results && !!results.length && (
            <Mutation mutation={addMovieMutation}>
              {addMovieAction => (
                <Fragment>
                  {results.map(result => (
                    <div key={result.id}>
                      <span>{result.title}</span>

                      <span
                        onClick={async () => {
                          const added = await addMovieAction({
                            variables: {
                              title: result.title,
                              voteAverage: result.voteAverage,
                              poster: result.poster,
                              description: result.description,
                              externalId: result.id,
                            },
                          });

                          if (added.data && added.data.addMovie.movie) {
                            add({
                              type: 'success',
                              message: 'Movie added.',
                            });
                          } else if (added.data && added.data.addMovie.error) {
                            add({
                              type: 'error',
                              message: added.data.addMovie.error.message,
                            });
                          }
                        }}
                      >
                        Add
                      </span>
                    </div>
                  ))}
                </Fragment>
              )}
            </Mutation>
          )}
          {results && !results.length && (
            <em>No movies found matching "{title}".</em>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AddMovie;
