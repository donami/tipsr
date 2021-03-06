import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { WithApolloClient } from 'react-apollo';
import getCurrentCredential from '../../queries/get-current-credential';

export type Props = {};
const SignOutPage: React.SFC<WithApolloClient<Props> & RouteComponentProps> = ({
  history,
  client,
}) => {
  useEffect(() => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/logout`
        : 'http://localhost:3000/logout';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(result => {
        return result.json();
      })
      .then(json => {
        const credential = null;
        // Clear the cache of the credential
        client.writeQuery({
          query: getCurrentCredential,
          data: { credential },
        });
        history.push('/');
      });
  }, []);

  return null;
};

export default SignOutPage;
