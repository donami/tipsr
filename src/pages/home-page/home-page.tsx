import React, { Fragment } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import { Link } from 'react-router-dom';

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
