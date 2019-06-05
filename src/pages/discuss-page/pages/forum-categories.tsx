import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route, Link } from 'react-router-dom';
import { default as getForumCategories } from '@/queries/forum-categories';
import Loader from '@/components/ui/loader';
import Heading from '@/components/ui/heading';
import Topics from './topics';
import CreateTopic from '../components/create-topic';
import forumCategory from '../../../queries/forum-category';
import { Breadcrumb } from '@/components/ui/breadcrumbs';
import CategoryItem from '../components/category-item';
import styled from '../../../lib/styledComponents';
import Button from '../../../components/ui/button';

type Props = any;
const ForumCategories: React.SFC<Props> = () => {
  return (
    <Switch>
      <Route
        path={'/discuss/create-topic/:categoryId?'}
        render={routeProps => {
          return (
            <Breadcrumb
              data={{
                title: 'Create topic',
                pathname: routeProps.match.url,
              }}
            >
              <CreateTopic {...routeProps} />
            </Breadcrumb>
          );
        }}
      />
      <Route
        path={'/discuss/:categoryId-:slug'}
        render={(routeProps: any) => (
          <Query
            query={forumCategory}
            variables={{ id: +routeProps.match.params.categoryId }}
          >
            {({ data, loading }) => {
              if (loading || !data.forumCategory) {
                return null;
              }
              return (
                <Breadcrumb
                  data={{
                    title: data.forumCategory.title,
                    pathname: routeProps.match.url,
                  }}
                >
                  <Topics
                    {...routeProps}
                    loading={loading}
                    category={data.forumCategory || null}
                  />
                </Breadcrumb>
              );
            }}
          </Query>
        )}
      />
      <Route
        render={() => (
          <div>
            <Top>
              <Heading sectionTitle>Categories</Heading>

              <Button as={Link} to="/discuss/create-topic" primary>
                Create topic
              </Button>
            </Top>

            <Query query={getForumCategories}>
              {({ data, loading }) => {
                if (loading) {
                  return <Loader />;
                }

                return (
                  <>
                    {!data.forumCategories.length && (
                      <p>No categories created.</p>
                    )}
                    {data.forumCategories
                      .filter(c => !c.movie)
                      .map((category: any) => (
                        <CategoryItem key={category.id} category={category} />
                      ))}
                  </>
                );
              }}
            </Query>
          </div>
        )}
      />
    </Switch>
  );
};

export default ForumCategories;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.normal};

  .heading {
    margin: 0;
  }
`;
