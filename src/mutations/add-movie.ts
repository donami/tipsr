import gql from 'graphql-tag';

export default gql`
  mutation($title: String!, $poster: String) {
    addMovie(title: $title, poster: $poster) {
      movie {
        id
        title
        poster
      }
      error {
        message
      }
    }
  }
`;
