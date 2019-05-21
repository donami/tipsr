import React from 'react';
import { Query } from 'react-apollo';
import reviews from '../../queries/reviews';
import Loader from '../ui/loader';
import Comment from '../comments/comment';
import styled from '../../lib/styledComponents';
import Heading from '../ui/heading';

type Props = {
  movieId: number;
  externalId: number;
};
const MovieReviews: React.SFC<Props> = ({ externalId }) => {
  return (
    <Wrapper>
      <Heading sectionTitle>Movie Reviews</Heading>

      <Query query={reviews} variables={{ movieId: externalId }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }

          if (!data.reviews || !data.reviews.reviews) {
            return <p>No reviews written yet...</p>;
          }

          return (
            <>
              {data.reviews.reviews.map((review: any) => (
                <Comment key={review.id} comment={review} />
              ))}
            </>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default MovieReviews;

const Wrapper = styled.div``;
