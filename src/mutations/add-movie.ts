import gql from 'graphql-tag';

export default gql`
  mutation($title: String!, $poster: String, $externalId: Int) {
    addMovie(title: $title, poster: $poster, externalId: $externalId) {
      movie {
        id
        title
        poster
        externalId
      }
      error {
        message
      }
    }
  }
`;
