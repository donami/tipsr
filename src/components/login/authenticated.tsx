import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type Props = { redirect?: boolean } & RouteComponentProps;
const Authenticated: React.SFC<Props> = ({
  redirect = true,
  history,
  children,
}) => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return null;
  }
  if (!sessionStorage.getItem('token')) {
    if (redirect) {
      history.push('/login');
    }
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(Authenticated);
