import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import movies from '@/queries/movies';
import Poster from './poster';
import HorizontalList from '../ui/horizontal-list';

type Props = {};
const FeaturedMovies: React.SFC<Props> = () => {
  return (
    <Query query={movies} variables={{ featured: true }}>
      {({ data, loading }) => {
        return (
          <HorizontalList
            items={data.movies}
            title="Featured Movies"
            loading={loading}
            renderItem={(item: any) => {
              return (
                <>
                  <div>
                    <Poster image={item.poster} small />
                  </div>
                  <Link to={`/movie/${item.id}`}>{item.title}</Link>
                </>
              );
            }}
          />
        );
      }}
    </Query>
  );
};

export default FeaturedMovies;