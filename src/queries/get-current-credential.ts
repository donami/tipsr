import gql from 'graphql-tag';

export default gql`
  query CurrentCredentialQuery @client {
    credential {
      email
      firstName
      lastName
      role
      id
      __typename
      token
    }
  }
`;
