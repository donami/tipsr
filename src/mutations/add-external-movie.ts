import gql from 'graphql-tag';

export default gql`
  mutation($externalId: Int!) {
    addExternalMovie(externalId: $externalId) {
      movie {
        id
        title
        poster
        backdropPath
        externalId
        voteAverage
      }
      error {
        message
      }
    }
  }
`;
