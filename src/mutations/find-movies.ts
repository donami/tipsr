import gql from 'graphql-tag';

export default gql`
  mutation($title: String!) {
    findMovies(title: $title) {
      id
      title
      poster
      voteAverage
      description
    }
  }
`;
