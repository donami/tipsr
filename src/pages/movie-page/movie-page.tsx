import React from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import { Query } from 'react-apollo';
import movie from '../../queries/movie';
import Loader from '../../components/ui/loader';
import { RouteComponentProps } from 'react-router-dom';
import Heading from '../../components/ui/heading';
import similar from '../../queries/similar';
import Poster from '../../components/movie/poster';
import AddToList from '../../components/lists/add-to-list';

type Props = {} & RouteComponentProps<{ id: string }>;
const MoviePage: React.SFC<Props> = ({ match }) => {
  return (
    <DefaultLayout>
      <h3>Movie Page</h3>
      <Query query={movie} variables={{ id: +match.params.id }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          if (!data.movie) {
            return <em>Oops, this page does not exist.</em>;
          }
          return (
            <div>
              <Heading as="h2">{data.movie.title}</Heading>
              <AddToList movieId={data.movie.id} />
              <Query
                query={similar}
                variables={{ externalId: data.movie.externalId }}
              >
                {({ data: similarData, loading: similarLoading }) => {
                  if (similarLoading) {
                    return <Loader />;
                  }

                  if (!similarData.similar) {
                    return null;
                  }

                  return (
                    <div>
                      {similarData.similar.map((item: any, index: number) => (
                        <div key={index}>
                          <Poster image={item.poster} small />
                          {item.title}
                        </div>
                      ))}
                    </div>
                  );
                }}
              </Query>
            </div>
          );
        }}
      </Query>
    </DefaultLayout>
  );
};

export default MoviePage;
