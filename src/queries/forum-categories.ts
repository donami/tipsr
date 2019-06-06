import gql from 'graphql-tag';

export default gql`
  {
    forumCategories {
      id
      title
      description
      createdAt
      updatedAt
      views
      posts
      movie {
        id
        title
      }
      topics {
        id
        title
        views
        createdAt
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
