import gql from 'graphql-tag';

export default gql`
  mutation($movieId: Int!) {
    addFavorite(movieId: $movieId) {
      favorites {
        id
        title
        description
        __typename
      }
      error {
        message
      }
    }
  }
`;
