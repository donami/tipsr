import gql from 'graphql-tag';

export default gql`
  query($first: Int, $after: String) {
    allMoviesCursor(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
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
        cursor
      }
    }
  }
`;
