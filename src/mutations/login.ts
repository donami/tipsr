import gql from 'graphql-tag';

export default gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
        jwt
        token
      }
      error {
        message
      }
    }
  }
`;
