import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    forumCategory(id: $id) {
      id
      title
      views
      posts
      topics {
        id
        title
        views
        createdAt
        category {
          id
          title
        }
        user {
          id
          fullName
        }
        # posts {
        #   id
        # }
        __typename
      }
      __typename
    }
  }
`;
