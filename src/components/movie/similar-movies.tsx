import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import similar from '@/queries/similar';
import Poster from './poster';
import HorizontalList from '../ui/horizontal-list';
import { slugify } from '@/lib/helpers';

type Props = { externalId: number; className?: string };
const SimilarMovies: React.SFC<Props> = ({ externalId, className }) => {
  return (
    <Query query={similar} variables={{ externalId }}>
      {({ data, loading }) => {
        return (
          <HorizontalList
            items={data.similar}
            className={className || 'horizontal-list'}
            title="Similar Movies"
            loading={loading}
            renderItem={(item: any) => {
              let link = '';

              if (item.id === item.externalId) {
                link = `/movie/${item.id}-${slugify(item.title)}/true`;
              } else {
                link = `/movie/${item.id}-${slugify(item.title)}`;
              }
              return (
                <>
                  <div>
                    <Poster image={item.poster} small />
                  </div>
                  <Link to={link}>{item.title}</Link>
                </>
              );
            }}
          />
        );
      }}
    </Query>
  );
};

export default SimilarMovies;
