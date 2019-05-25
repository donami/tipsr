import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import addFavorite from '../../mutations/add-favorite';
import favorites from '../../queries/favorites';
import { useToasts } from '@/components/toasts/toast-manager';

const AddFavoriteAction: React.SFC<any> = ({ children }) => {
  const { add } = useToasts();

  return (
    <Mutation
      mutation={addFavorite}
      update={(proxy, { data: { addFavorite } }) => {
        try {
          const data = proxy.readQuery({
            query: favorites,
          });

          proxy.writeQuery({
            query: favorites,
            data: {
              ...data,
              favorites: addFavorite.favorites,
            },
          });
        } catch (error) {}
      }}
    >
      {mutate => <React.Fragment>{children({ mutate, add })}</React.Fragment>}
    </Mutation>
  );
};

export default AddFavoriteAction;
