import gql from 'graphql-tag';

export default gql`
  {
    genres {
      id
      name
      __typename
    }
  }
`;
