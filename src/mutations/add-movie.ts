import gql from 'graphql-tag';

export default gql`
  mutation(
    $title: String!
    $poster: String
    $externalId: Int
    $voteAverage: Float
  ) {
    addMovie(
      title: $title
      poster: $poster
      externalId: $externalId
      voteAverage: $voteAverage
    ) {
      movie {
        id
        title
        poster
        externalId
        voteAverage
      }
      error {
        message
      }
    }
  }
`;
