import gql from 'graphql-tag';

export default gql`
  query($movieId: Int!) {
    reviews(movieId: $movieId) {
      reviews {
        id
        author
        content
        url
      }
      error {
        message
      }
    }
  }
`;
