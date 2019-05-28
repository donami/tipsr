import gql from 'graphql-tag';

export default gql`
  query($term: String, $limit: Int) {
    search(term: $term, limit: $limit) {
      id
      title
      poster
    }
  }
`;
