import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import styled from '@/lib/styledComponents';
import Button from '@/components/ui/button';
import Field from '@/components/ui/field';
import Input from '@/components/ui/input';
import addForumPost from '@/mutations/add-forum-post';
import forumTopic from '@/queries/forum-topic';
import AppStateContext from '@/components/layout/app-state-context';

type Props = { topicId: number };
const Reply: React.SFC<Props> = ({ topicId }) => {
  const [message, setMessage] = useState('');
  const { auth } = useContext(AppStateContext);

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
      mutation={addForumPost}
      update={(proxy, { data: { addForumPost } }) => {
        const data: any = proxy.readQuery({
          query: forumTopic,
          variables: {
            id: topicId,
          },
        });

        proxy.writeQuery({
          query: forumTopic,
          variables: {
            id: topicId,
          },
          data: {
            ...data,
            forumTopic: {
              ...data.forumTopic,
              posts: [...data.forumTopic.posts, addForumPost],
            },
          },
        });
      }}
    >
      {mutate => (
        <Wrapper
          onSubmit={async e => {
            e.preventDefault();

            if (message && !!message.length) {
              await mutate({
                variables: {
                  message,
                  topicId,
                },
              });
              setMessage('');
            }
          }}
        >
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
          <Button primary type="submit" disabled={!message.length}>
            Reply
          </Button>
        </Wrapper>
      )}
    </Mutation>
  );
};

export default Reply;

const Wrapper = styled.form``;

const StyledInput = styled(Input)`
  width: 60%;
  height: 120px;
  font-family: Poppins, serif;
`;

const NotAuthed = styled.div`
  padding: ${props => props.theme.spacing.large};
`;
