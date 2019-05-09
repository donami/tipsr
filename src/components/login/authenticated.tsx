import React from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import getCurrentCredential from '../../queries/get-current-credential';
import { Query } from 'react-apollo';

type Props = { redirect?: boolean } & RouteComponentProps;
const Authenticated: React.SFC<Props> = ({ redirect = true, children }) => {
  return (
    <Query query={getCurrentCredential} fetchPolicy="cache-only">
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        if (data.credential && data.credential.id) {
          return <React.Fragment>{children}</React.Fragment>;
        }

        if (redirect) {
          return <Redirect to="/login" />;
        }
        return null;
      }}
    </Query>
  );
  // if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
  //   return null;
  // }
  // if (!sessionStorage.getItem('token')) {
  //   if (redirect) {
  //     history.push('/login');
  //   }
  //   return null;
  // }
  // return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(Authenticated);
