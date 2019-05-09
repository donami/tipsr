import React, { Fragment } from 'react';
import DefaultLayout from '@/components/layout/default-layout';

type Props = {};
const HomePage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Fragment>Home Page</Fragment>
    </DefaultLayout>
  );
};

export default HomePage;
