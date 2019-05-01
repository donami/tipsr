import gql from 'graphql-tag';

export default gql`
  {
    favorites {
      id
      title
      poster
      externalId
      __typename
    }
  }
`;
