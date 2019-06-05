import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    forumTopic(id: $id) {
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
