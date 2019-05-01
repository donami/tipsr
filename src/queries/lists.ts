import gql from 'graphql-tag';

export default gql`
  {
    lists {
      id
      title
      movies {
        id
        title
      }
      __typename
    }
  }
`;
