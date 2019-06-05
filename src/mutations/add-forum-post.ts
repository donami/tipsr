import gql from 'graphql-tag';

export default gql`
  mutation($message: String!, $topicId: Int!) {
    addForumPost(message: $message, topicId: $topicId) {
      id
      user {
        id
        firstName
        lastName
      }
      message
      createdAt
      __typename
    }
  }
`;
