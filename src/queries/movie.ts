import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    movie(id: $id) {
      id
      title
      poster
      description
      externalId
      voteAverage
      __typename
    }
  }
`;
