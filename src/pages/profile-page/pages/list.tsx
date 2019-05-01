import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import listQuery from '../../../queries/list';
import Loader from '../../../components/ui/loader';
import removeFromList from '../../../mutations/remove-from-list';

type Props = {} & RouteComponentProps;
const List: React.SFC<Props> = ({ match }) => {
  return (
    <div>
      <h3>List</h3>

      <Query query={listQuery} variables={{ listId: +match.params.id }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          if (!data.list) {
            return <em>List not found.</em>;
          }

          return (
            <div>
              <h4>{data.list.title}</h4>

              {!data.list.movies.length && (
                <em>You have not added any movies to this list yet.</em>
              )}
              {!!data.list.movies.length && (
                <Mutation mutation={removeFromList}>
                  {mutate => (
                    <Fragment>
                      {data.list.movies.map((movie: any, index: number) => (
                        <div key={index}>
                          {movie.title}
                          <span
                            onClick={() => {
                              mutate({
                                variables: {
                                  movieId: movie.id,
                                  listId: data.list.id,
                                },
                              });
                            }}
                          >
                            Remove
                          </span>
                        </div>
                      ))}
                    </Fragment>
                  )}
                </Mutation>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default List;
