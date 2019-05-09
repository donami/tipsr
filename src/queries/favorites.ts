import gql from 'graphql-tag';

export default gql`
  {
    favorites {
      id
      title
      poster
      description
      externalId
      __typename
    }
  }
`;
