import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '@/components/layout/default-layout';

type Props = {};
const HomePage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Fragment>
        Home Page
        <Link to="/login">Login</Link>
      </Fragment>
    </DefaultLayout>
  );
};

export default HomePage;
