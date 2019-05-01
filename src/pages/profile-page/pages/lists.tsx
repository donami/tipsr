import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import lists from '@/queries/lists';
import Loader from '@/components/ui/loader';
import { Link } from 'react-router-dom';
import removeList from '../../../mutations/remove-list';

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
            <div>
              <Mutation
                mutation={removeList}
                update={(proxy, { data: { removeList } }: any) => {
                  const data: ay = proxy.readQuery({ query: lists });
                  console.log(data);
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
                      <div key={item.id}>
                        <Link to={`/profile/list/${item.id}`}>
                          {item.title}
                        </Link>
                        <span
                          onClick={() => {
                            mutate({
                              variables: {
                                listId: item.id,
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
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default ListsPage;
