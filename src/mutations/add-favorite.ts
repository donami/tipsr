import gql from 'graphql-tag';

export default gql`
  mutation($movieId: Int!) {
    addFavorite(movieId: $movieId) {
      favorites {
        id
        title
        description
        poster
        externalId
        __typename
      }
      error {
        message
      }
    }
  }
`;
