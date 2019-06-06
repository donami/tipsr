import React from 'react';
import { Link, RouteComponentProps, Route, Switch } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import Heading from '@/components/ui/heading';
import { slugify } from '@/lib/helpers';
import Topic from './topic';
import TopicItem from '../components/topic-item';
import styled from '../../../lib/styledComponents';
import Button from '../../../components/ui/button';

type Props = {
  loading: boolean;
  category: any;
} & RouteComponentProps<{ categoryId: string }>;
const Topics: React.SFC<Props> = ({ category, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!category) {
    return <p>Ooops.. page not found.</p>;
  }

  return (
    <Switch>
      <Route
        path="/discuss/:categoryId-:categorySlug/:topicId-:slug"
        render={routeProps => {
          return <Topic {...routeProps} />;
        }}
      />
      <Route
        render={() => (
          <>
            <Top>
              <Heading sectionTitle>Topics in "{category.title}"</Heading>
              <CreateTopicButton
                as={Link}
                to={`/discuss/create-topic/${category.id}`}
                primary
              >
                Start a conversation
              </CreateTopicButton>
            </Top>

            {!category.topics.length && (
              <p>No topics in this category created.</p>
            )}
            {!!category.topics.length && (
              <div>
                {category.topics.map((topic: any) => (
                  <TopicItem key={topic.id} topic={topic}>
                    <Link
                      to={`/discuss/${category.id}-${slugify(category.title)}/${
                        topic.id
                      }-${slugify(topic.title)}`}
                    >
                      {topic.title}
                    </Link>
                  </TopicItem>
                ))}
              </div>
            )}
          </>
        )}
      />
    </Switch>
  );
};

export default Topics;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.normal};

  .heading {
    margin: 0;
  }
`;

const CreateTopicButton = styled(Button)``;
