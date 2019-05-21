import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import lists from '@/queries/lists';
import Loader from '@/components/ui/loader';
import { Link } from 'react-router-dom';
import removeList from '../../../mutations/remove-list';
import styled from '../../../lib/styledComponents';
import Icon from '@/components/ui/icon';

type Props = {};
const ListsPage: React.SFC<Props> = () => {
  return (
    <div>
      <h3>Lists</h3>
      <Query query={lists}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          if (!data.lists.length) {
            return <em>You have not created any lists yet.</em>;
          }

          return (
            <List>
              <Mutation
                mutation={removeList}
                update={(proxy, { data: { removeList } }: any) => {
                  const data: any = proxy.readQuery({ query: lists });
                  proxy.writeQuery({
                    query: lists,
                    data: {
                      ...data,
                      lists: data.lists.filter(
                        (list: any) => list.id !== removeList.list.id
                      ),
                    },
                  });
                }}
              >
                {mutate => (
                  <Fragment>
                    {data.lists.map(item => (
                      <ListItem key={item.id}>
                        <Link to={`/profile/list/${item.id}`}>
                          {item.title}
                        </Link>
                        <Icon
                          title="Delete list"
                          icon="trash"
                          onClick={() => {
                            mutate({
                              variables: {
                                listId: item.id,
                              },
                            });
                          }}
                        />
                      </ListItem>
                    ))}
                  </Fragment>
                )}
              </Mutation>
            </List>
          );
        }}
      </Query>
    </div>
  );
};

export default ListsPage;

const List = styled.div`
  max-width: 400px;
`;

const ListItem = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.small};
  justify-content: space-between;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  i,
  svg {
    opacity: 0.8;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;
