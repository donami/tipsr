import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    movie(id: $id) {
      id
      title
      poster
      backdropPath
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
  }
`;
