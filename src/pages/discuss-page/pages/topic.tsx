import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import forumTopic from '@/queries/forum-topic';
import Loader from '@/components/ui/loader';
import Heading from '@/components/ui/heading';
import PostItem from '../components/post-item';
import Reply from '../components/reply';
import { Breadcrumb } from '@/components/ui/breadcrumbs';

type Props = {} & RouteComponentProps<{ topicId: string }>;
const Topic: React.SFC<Props> = ({ match }) => {
  return (
    <Query query={forumTopic} variables={{ id: +match.params.topicId }}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />;
        }

        if (!data.forumTopic) {
          return (
            <Breadcrumb
              data={{
                title: 'Page not found',
                pathname: match.url,
              }}
            >
              <p>Ooops.. page not found.</p>
            </Breadcrumb>
          );
        }

        const { forumTopic: topic } = data;
        return (
          <Breadcrumb
            data={{
              title: topic.title,
              pathname: match.url,
            }}
          >
            <>
              <Heading sectionTitle>{topic.title}</Heading>

              <PostItem post={topic} />
              <>
                {!topic.posts.length && <p>No posts in this topic created.</p>}
                <div>
                  {topic.posts.map((post: any) => (
                    <PostItem key={post.id} post={post} />
                  ))}
                </div>
              </>

              <Reply topicId={topic.id} />
            </>
          </Breadcrumb>
        );
      }}
    </Query>
  );
};

export default Topic;
