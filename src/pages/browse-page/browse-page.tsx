import React from 'react';
import { Query } from 'react-apollo';
import Loader from '@/components/ui/loader';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '../../components/ui/heading';
import MovieList from '../../components/movie/movie-list';
import allMoviesCursor from '../../queries/all-movies-cursor';
import Button from '../../components/ui/button';
import styled from '@/lib/styledComponents';

const BrowsePage = () => {
  const itemsPerPage = 1;

  return (
    <Query query={allMoviesCursor} variables={{ first: itemsPerPage }}>
      {({ data, loading, fetchMore }) => {
        if (loading) {
          return <Loader />;
        }

        return (
          <DefaultLayout>
            <Heading sectionTitle>Movies</Heading>
            <MovieList
              movies={data.allMoviesCursor.edges.map((i: any) => i.node) || []}
            />
            {data.allMoviesCursor.pageInfo.hasNextPage && (
              <FetchMoreButton
                onClick={() => {
                  fetchMore({
                    query: allMoviesCursor,
                    variables: {
                      first: itemsPerPage,
                      after: data.allMoviesCursor.pageInfo.endCursor || '1',
                    },
                    updateQuery: (
                      previousResult: any,
                      { fetchMoreResult }: any
                    ) => {
                      if (!fetchMoreResult) {
                        return previousResult;
                      }

                      return {
                        ...previousResult,
                        allMoviesCursor: {
                          ...previousResult.allMoviesCursor,
                          pageInfo: fetchMoreResult.allMoviesCursor.pageInfo,
                          edges: [
                            ...previousResult.allMoviesCursor.edges,
                            ...fetchMoreResult.allMoviesCursor.edges,
                          ],
                        },
                      };
                    },
                  });
                }}
              >
                Fetch more
              </FetchMoreButton>
            )}
          </DefaultLayout>
        );
      }}
    </Query>
  );
};

export default BrowsePage;

const FetchMoreButton = styled(Button)`
  width: 100%;
`;
