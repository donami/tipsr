import React, { useState, useContext } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import styled from '@/lib/styledComponents';
import Button from '@/components/ui/button';
import Field from '@/components/ui/field';
import Input from '@/components/ui/input';
import addForumTopic from '@/mutations/add-forum-topic';
import forumCategories from '@/queries/forum-categories';
import { useToasts } from '@/components/toasts/toast-manager';
import AppStateContext from '@/components/layout/app-state-context';
import { slugify } from '../../../lib/helpers';
import Heading from '../../../components/ui/heading';

type Props = {} & RouteComponentProps;
const CreateTopic: React.SFC<Props> = ({ history, match }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState(null);
  const [disabledCategoryPicker, setDisableCategoryPicker] = useState(false);
  const { auth } = useContext(AppStateContext);
  const { add } = useToasts();

  if (!auth) {
    return (
      <NotAuthed>
        <h3>Signup to join the discussion!</h3>
        <p>
          Share your thoughts with the community,{' '}
          <Link to="/signup">signup</Link> today.
        </p>
      </NotAuthed>
    );
  }

  return (
    <Mutation
      mutation={addForumTopic}
      update={(proxy, { data: { addForumTopic } }) => {
        if (!category) {
          return;
        }

        const data: any = proxy.readQuery({
          query: forumCategories,
        });

        const currentCategoryIndex = data.forumCategories.findIndex(
          c => c.id === category.id
        );

        const updatedCategory = {
          ...data.forumCategories[currentCategoryIndex],
          topics: [
            addForumTopic,
            ...data.forumCategories[currentCategoryIndex].topics,
          ],
        };

        proxy.writeQuery({
          query: forumCategories,
          data: {
            ...data,
            forumCategories: [
              ...data.forumCategories.slice(0, currentCategoryIndex),
              updatedCategory,
              ...data.forumCategories.slice(currentCategoryIndex + 1),
            ],
          },
        });
      }}
    >
      {mutate => (
        <Wrapper
          onSubmit={async e => {
            e.preventDefault();

            if (
              title &&
              !!title.length &&
              message &&
              !!message.length &&
              category
            ) {
              try {
                const {
                  data: { addForumTopic: topic },
                } = await mutate({
                  variables: {
                    title,
                    message,
                    categoryId: category.id,
                  },
                });
                add({
                  type: 'success',
                  message: 'Topic created!',
                });
                setMessage('');
                setTitle('');
                setCategory(null);
                history.push(
                  `/discuss/${category.id}-${slugify(category.title)}/${
                    topic.id
                  }-${slugify(topic.title)}`
                );
              } catch (error) {
                add({
                  type: 'error',
                  message: 'Something went wrong.',
                });
              }
            } else {
              add({
                type: 'error',
                message: 'Please fill in all required fields.',
              });
            }
          }}
        >
          <Heading>Create a new conversation</Heading>
          <Field>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Field>

          <Query query={forumCategories}>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }

              if (category === null && match.params.categoryId) {
                const preselected = data.forumCategories.find(
                  c => c.id === +match.params.categoryId
                );

                if (preselected) {
                  setCategory(preselected);
                  if (preselected.movie) {
                    setDisableCategoryPicker(true);
                  }
                }
              }

              if (disabledCategoryPicker) {
                return category ? (
                  <PreselectedCategory>{category.title}</PreselectedCategory>
                ) : null;
              }

              return (
                <Field>
                  <select
                    value={(category && category!.id.toString()) || undefined}
                    onChange={e => {
                      const category = data.forumCategories.find(
                        c => c.id === +e.target.value
                      );
                      setCategory(category);
                    }}
                  >
                    <option value={-1}>Select category</option>
                    {data.forumCategories
                      .filter((c: any) => !c.movie)
                      .map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                  </select>
                </Field>
              );
            }}
          </Query>

          <Field>
            <StyledInput
              as="textarea"
              placeholder="Share your thoughts..."
              value={message}
              onChange={e => {
                setMessage(e.target.value);
              }}
            />
          </Field>
          <Button
            primary
            type="submit"
            disabled={!message.length || !title.length || !category}
          >
            Submit
          </Button>
        </Wrapper>
      )}
    </Mutation>
  );
};

export default withRouter(CreateTopic);

const Wrapper = styled.form`
  background: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};

  h3 {
    margin-bottom: ${props => props.theme.spacing.normal};
  }
`;

const StyledInput = styled(Input)`
  width: 60%;
  height: 120px;
  font-family: Poppins, serif;
`;

const NotAuthed = styled.div`
  padding: ${props => props.theme.spacing.large};
`;

const PreselectedCategory = styled.div`
  margin: ${props => props.theme.spacing.normal} 0;
`;
