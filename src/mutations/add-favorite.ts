import gql from 'graphql-tag';

export default gql`
  mutation($movieId: Int!) {
    addFavorite(movieId: $movieId) {
      favorites {
        id
        title
        __typename
      }
      error {
        message
      }
    }
  }
`;
