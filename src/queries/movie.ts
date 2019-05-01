import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    movie(id: $id) {
      id
      title
      poster
      externalId
      __typename
    }
  }
`;
