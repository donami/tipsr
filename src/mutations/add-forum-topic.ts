import gql from 'graphql-tag';

export default gql`
  mutation($title: String!, $message: String!, $categoryId: Int!) {
    addForumTopic(title: $title, message: $message, categoryId: $categoryId) {
      id
      title
      views
      message
      createdAt
      category {
        id
        title
      }
      user {
        id
        fullName
      }
      posts {
        id
        user {
          id
          fullName
        }
        message
        createdAt
        __typename
      }
      __typename
    }
  }
`;
