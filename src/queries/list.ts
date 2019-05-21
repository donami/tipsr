import gql from 'graphql-tag';

export default gql`
  query($listId: Int!) {
    list(listId: $listId) {
      id
      title
      movies {
        id
        title
        poster
      }
      __typename
    }
  }
`;
