import gql from 'graphql-tag';

export default gql`
  {
    movies {
      id
      title
      description
      poster
      externalId
      voteAverage
    }
  }
`;
