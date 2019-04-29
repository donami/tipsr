import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps;
const SignOutPage: React.SFC<Props> = ({ history }) => {
  useEffect(() => {
    sessionStorage.removeItem('token');
    history.push('/');
  });
  return null;
};

export default SignOutPage;
