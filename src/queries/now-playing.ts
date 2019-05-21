import gql from 'graphql-tag';

export default gql`
  {
    nowPlaying {
      movies {
        id
        title
        poster
        backdropPath
        featured
        releaseDate
        # genres {
        #   id
        #   name
        #   __typename
        # }
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
