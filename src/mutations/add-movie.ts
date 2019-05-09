import gql from 'graphql-tag';

export default gql`
  mutation(
    $title: String!
    $poster: String
    $externalId: Int
    $description: String
    $voteAverage: Float
  ) {
    addMovie(
      title: $title
      poster: $poster
      externalId: $externalId
      description: $description
      voteAverage: $voteAverage
    ) {
      movie {
        id
        title
        poster
        description
        externalId
        voteAverage
      }
      error {
        message
      }
    }
  }
`;
