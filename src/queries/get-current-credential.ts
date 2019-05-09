import gql from 'graphql-tag';

export default gql`
  query CurrentCredentialQuery @client {
    credential {
      email
      firstName
      lastName
      id
      __typename
      token
    }
  }
`;
