import React from 'react';
import styled from '@/lib/styledComponents';
import DefaultLayout from '@/components/layout/default-layout';
import FeaturedMovies from '../../components/movie/featured-movies';
import NowPlaying from '../../components/movie/now-playing';

type Props = {};
const HomePage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
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
