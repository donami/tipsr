import React from 'react';
import styled from '@/lib/styledComponents';
import DefaultLayout from '@/components/layout/default-layout';
import FeaturedMovies from '../../components/movie/featured-movies';
import NowPlaying from '../../components/movie/now-playing';
import { truncate } from '../../lib/helpers';
import Helmet from 'react-helmet';

type Props = {};
const HomePage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Helmet>
        <meta
          name="description"
          content={truncate(
            'The Spot-movie web application will help you find the next movie to watch next!',
            160
          )}
        />
      </Helmet>
      <Top>
        <NowPlaying className="now-playing" />
        <FeaturedMovies vertical />
      </Top>
    </DefaultLayout>
  );
};

export default HomePage;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;

  .now-playing {
    min-width: 70%;
  }

  > div {
    @media (max-width: 1000px) {
      min-width: 100%;
      margin-bottom: ${props => props.theme.spacing.normal};
      margin-right: 0;
    }
    flex: 1;
    margin-right: ${props => props.theme.spacing.normal};

    &:last-child {
      margin-right: 0;
    }
  }
`;
