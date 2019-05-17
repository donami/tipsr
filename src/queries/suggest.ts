import gql from 'graphql-tag';

export default gql`
  query($filters: SuggestFiltersInput) {
    suggest(filters: $filters) {
      movie {
        id
        title
        poster
        backdropPath
        description
        externalId
        releaseDate
        genres {
          id
          name
        }
        voteAverage
      }
      error {
        message
      }
      __typename
    }
  }
`;
