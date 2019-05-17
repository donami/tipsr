import gql from 'graphql-tag';

export default gql`
  query($featured: Boolean) {
    movies(featured: $featured) {
      id
      title
      description
      poster
      backdropPath
      featured
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
