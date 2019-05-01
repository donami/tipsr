import gql from 'graphql-tag';

export default gql`
  query($term: String) {
    search(term: $term) {
      id
      title
      poster
    }
  }
`;
