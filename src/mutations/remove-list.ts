import gql from 'graphql-tag';

export default gql`
  mutation($listId: Int!) {
    removeList(listId: $listId) {
      list {
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
