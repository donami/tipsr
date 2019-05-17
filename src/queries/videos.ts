import gql from 'graphql-tag';

export default gql`
  query($externalMovieId: Int!) {
    videos(externalMovieId: $externalMovieId) {
      videos {
        id
        key
        name
        site
        type
        size
      }
      error {
        message
      }
      __typename
    }
  }
`;
