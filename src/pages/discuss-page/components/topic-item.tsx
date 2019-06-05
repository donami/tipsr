import React from 'react';
import { Link } from 'react-router-dom';
import { slugify, formatDate } from '../../../lib/helpers';
import styled from '../../../lib/styledComponents';
import Avatar from '../../../components/ui/avatar';

type Props = { topic: any };
const TopicItem: React.SFC<Props> = ({ topic }) => {
  return (
    <Wrapper>
      <Title>
        <Avatar name={topic.user.fullName} view="sm" />
        <div>
          <Link
            to={`/discuss/${topic.category.id}-${slugify(
              topic.category.title
            )}/${topic.id}-${slugify(topic.title)}`}
          >
            {topic.title}
          </Link>
          <span>
            by <em>{`${topic.user.fullName}`}</em>
          </span>
        </div>
      </Title>
      <div>0 replies</div>
      <div>
        <span>{formatDate(topic.createdAt, true)}</span>
      </div>
    </Wrapper>
  );
};

export default TopicItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};

  a {
    text-decoration: none;
    display: block;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.div`
  min-width: 50%;

  > * {
    margin-right: ${props => props.theme.spacing.normal};
  }

  span {
    color: #777;
  }
`;
