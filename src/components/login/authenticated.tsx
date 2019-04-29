import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps;
const Authenticated: React.SFC<Props> = ({ history, children }) => {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }
  if (!sessionStorage.getItem('token')) {
    history.push('/login');
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(Authenticated);
