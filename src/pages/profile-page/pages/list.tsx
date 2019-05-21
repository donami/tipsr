import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import listQuery from '../../../queries/list';
import Loader from '../../../components/ui/loader';
import removeFromList from '../../../mutations/remove-from-list';
import Icon from '../../../components/ui/icon';
import styled from '../../../lib/styledComponents';
import Poster from '../../../components/movie/poster';

type Props = {} & RouteComponentProps;
const List: React.SFC<Props> = ({ match }) => {
  return (
    <Query query={listQuery} variables={{ listId: +match.params.id }}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />;
        }

        if (!data.list) {
          return <em>List not found.</em>;
        }

        return (
          <Wrapper>
            <h4>
              <Icon icon="film" />
              {data.list.title}
            </h4>
            {!data.list.movies.length && (
              <em className="no-results">
                You have not added any movies to this list yet.
              </em>
            )}
            {!!data.list.movies.length && (
              <Mutation mutation={removeFromList}>
                {mutate => (
                  <div>
                    {data.list.movies.map((movie: any, index: number) => (
                      <Item key={index}>
                        <div className="poster-wrapper">
                          <Poster image={movie.poster} small />
                        </div>
                        <div className="item-info">
                          <h5>{movie.title}</h5>
                          <span
                            className="remove-button"
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
                      </Item>
                    ))}
                  </div>
                )}
              </Mutation>
            )}
          </Wrapper>
        );
      }}
    </Query>
  );
};

export default List;

const Wrapper = styled.div`
  max-width: 500px;

  h4 {
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: ${props => props.theme.spacing.normal};

    i,
    svg {
      margin-right: ${props => props.theme.spacing.small};
    }
  }

  .no-results {
    font-size: 0.9em;
    color: #999;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.normal};

  img {
    margin-right: ${props => props.theme.spacing.small};
  }

  h5 {
    margin-bottom: ${props => props.theme.spacing.small};
  }

  .poster-wrapper {
    flex: 1;
    flex-grow: 0;
    min-width: 100px;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing.normal};
  }

  .remove-button {
    display: none;
    font-size: 0.9em;
    opacity: 0.8;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    .remove-button {
      display: block;
    }
  }
`;
