import gql from 'graphql-tag';

export default gql`
  mutation($movieId: Int!, $featured: Boolean) {
    updateMovie(movieId: $movieId, featured: $featured) {
      movie {
        id
        title
        poster
        backdropPath
        featured
        releaseDate
        genres {
          id
          name
          __typename
        }
        description
        externalId
        voteAverage
        __typename
      }
      error {
        message
      }
    }
  }
`;
