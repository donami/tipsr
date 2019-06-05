import React from 'react';
import { formatDate } from '../../../lib/helpers';
import styled from '../../../lib/styledComponents';
import Avatar from '@/components/ui/avatar';

type Props = { post: any };
const PostItem: React.SFC<Props> = ({ post }) => {
  return (
    <Wrapper>
      <Top>
        <div>
          <Avatar name={post.user.fullName} view="md" />
        </div>
        <div>
          {post.user.fullName} <br />
          <span>{formatDate(post.createdAt, true)}</span>
        </div>
      </Top>
      <Content>{post.message}</Content>
    </Wrapper>
  );
};

export default PostItem;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  margin-bottom: ${props => props.theme.spacing.large};
  border-radius: 4px;
`;

const Top = styled.div`
  padding: ${props => props.theme.spacing.normal};
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.colors.secondary} 1px solid;

  > * {
    margin-right: ${props => props.theme.spacing.normal};

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.normal};
`;
