import gql from 'graphql-tag';

export default gql`
  query($externalId: Int!) {
    similar(externalId: $externalId) {
      id
      title
      poster
      externalId
    }
  }
`;
