import gql from 'graphql-tag';

export default gql`
  mutation($movieId: Int!, $listId: Int!) {
    addToList(movieId: $movieId, listId: $listId) {
      list {
        id
        title
        movies {
          id
          title
        }
      }
      error {
        message
      }
    }
  }
`;
