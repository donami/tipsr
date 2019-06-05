import gql from 'graphql-tag';

export default gql`
  {
    forumCategories {
      id
      title
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
        # user {
        #   id
        # }
        # posts {
        #   id
        # }
        __typename
      }
      __typename
    }
  }
`;
