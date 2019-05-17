import React from 'react';
import showdown from 'showdown';

import styled from '@/lib/styledComponents';
import Avatar from '../ui/avatar';
import { Comment } from '../../interfaces/models';
import ActionButton from '../ui/action-button';
import Icon from '../ui/icon';

type Props = {
  comment: Comment;
};
const Comment: React.SFC<Props> = ({ comment }) => {
  const converter = new showdown.Converter();

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar name={comment.author} view="md" />
      </AvatarWrapper>
      <Content>
        <Top>
          <Author>{comment.author}</Author>
          {/* <CreatedAt>2 min ago</CreatedAt> */}
          {/* <CreatedAt>Report comment</CreatedAt> */}
        </Top>
        <Main>
          <div
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(comment.content),
            }}
          />
        </Main>
        <Bottom>
          <ActionButton>
            <Icon icon={['far', 'heart']} />
          </ActionButton>
        </Bottom>
      </Content>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing.normal};
  border-radius: 4px;
  display: flex;
  background-color: #2e2e2e;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: ${props => props.theme.spacing.large};
`;

const Content = styled.div`
  /* max-width: 800px; */
  flex: 1;
`;
const AvatarWrapper = styled.div`
  max-width: 140px;
  flex: 1;
  text-align: center;
  max-width: 70px;
  margin-right: ${props => props.theme.spacing.normal};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.normal};
`;
const Author = styled.div`
  font-weight: bold;
`;
const Main = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};

  p {
    margin-bottom: ${props => props.theme.spacing.normal};
    line-height: 1.8em;
  }
`;
const CreatedAt = styled.div`
  color: #cacaca;
`;
const Bottom = styled.div``;
