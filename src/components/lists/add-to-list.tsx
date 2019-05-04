import React, { Fragment, useState, useContext } from 'react';
import { Query, Mutation } from 'react-apollo';
import lists from '../../queries/lists';
import addToListMutation from '../../mutations/add-to-list';
import Button from '../ui/button';
import Authenticated from '@/components/login/authenticated';
import { useToasts } from '@/components/toasts/toast-manager';

type Props = { movieId: number };
const AddToList: React.SFC<Props> = ({ movieId }) => {
  const [selected, setSelected] = useState(-1);
  const { add } = useToasts();

  const handleChange = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <Authenticated redirect={false}>
      <Query query={lists}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data || !data.lists) {
            return <em>You have not created any lists</em>;
          }

          return (
            <Fragment>
              <select onChange={handleChange}>
                {!data.lists.length && (
                  <option value="-1">No lists created</option>
                )}
                {!!data.lists.length && (
                  <Fragment>
                    <option value="-1">Select list</option>
                    {data.lists.map((list: any) => (
                      <option key={list.id} value={list.id}>
                        {list.title}
                      </option>
                    ))}
                  </Fragment>
                )}
              </select>
              <Mutation mutation={addToListMutation}>
                {mutate => (
                  <Button
                    type="button"
                    onClick={async () => {
                      try {
                        await mutate({
                          variables: {
                            movieId,
                            listId: +selected,
                          },
                        });

                        add({
                          type: 'success',
                          message: 'Added to list.',
                        });
                      } catch (error) {
                        add({
                          type: 'error',
                          message: 'Something went wrong.',
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                )}
              </Mutation>
            </Fragment>
          );
        }}
      </Query>
    </Authenticated>
  );
};

export default AddToList;
