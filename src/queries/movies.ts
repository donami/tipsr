import gql from 'graphql-tag';

export default gql`
  {
    movies {
      id
      title
      description
      poster
      backdropPath
      releaseDate
      genres {
        id
        name
        __typename
      }
      externalId
      voteAverage
    }
  }
`;
