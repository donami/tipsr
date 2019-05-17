import React, { Fragment } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import FeaturedMovies from '../../components/movie/featured-movies';

type Props = {};
const HomePage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Fragment>Home Page</Fragment>

      <FeaturedMovies />
    </DefaultLayout>
  );
};

export default HomePage;
