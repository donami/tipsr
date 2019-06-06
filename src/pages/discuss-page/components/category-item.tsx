import React from 'react';
import styled from '../../../lib/styledComponents';
import { Link } from 'react-router-dom';
import Avatar from '@/components/ui/avatar';
import { slugify, formatDate } from '@/lib/helpers';

type Props = { category: any };
const CategoryItem: React.SFC<Props> = ({ category }) => {
  return (
    <Wrapper>
      <Left>
        <h3>
          <Link to={`/discuss/${category.id}-${slugify(category.title)}`}>
            {category.title}
          </Link>
        </h3>
        {category.description && <p>{category.description}</p>}
      </Left>
      <Right>
        <RightTop>
          <Stat>
            <StatTitle>Topics</StatTitle>
            <StatValue large={true}>{category.topics.length}</StatValue>
          </Stat>
          <Stat>
            <StatTitle>Posts</StatTitle>
            <StatValue large={true}>{category.posts}</StatValue>
          </Stat>
          <Stat>
            <StatTitle>Activity</StatTitle>
            <StatValue large={false}>
              {category.topics && !!category.topics.length ? (
                <>{formatDate(category.updatedAt, true)}</>
              ) : (
                <>No activity</>
              )}
            </StatValue>
          </Stat>
        </RightTop>
        <RightBottom>
          <StatTitle>Last topic</StatTitle>
          {category.topics && !!category.topics.length ? (
            <StatValue large={false}>
              <Avatar name={category.topics[0].user.fullName} view="sm" />
              <Link
                to={`/discuss/${category.id}-${slugify(category.title)}/${
                  category.topics[0].id
                }-${slugify(category.topics[0].title)}`}
              >
                {category.topics[0].title}
              </Link>
            </StatValue>
          ) : (
            <StatValue large={false}>No topics created yet</StatValue>
          )}
        </RightBottom>
      </Right>
    </Wrapper>
  );
};

export default CategoryItem;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  margin-bottom: ${props => props.theme.spacing.normal};
  border-radius: 4px;
  padding: ${props => props.theme.spacing.normal};
  display: flex;
  justify-content: space-between;
  border-radius: 5px;

  a {
    text-decoration: none;
    transition: all 200ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Left = styled.div`
  flex: 1;
  border-right: #3e3e3e 1px solid;
  padding: ${props => props.theme.spacing.normal};

  h3 {
    font-size: 1em;
  }

  p {
    font-size: 0.8em;
  }
`;
const Right = styled.div`
  flex: 1;
`;

const Stat = styled.div``;
const StatTitle = styled.div`
  color: #999;
  font-size: 0.9em;
`;
const StatValue = styled.div<{ large: boolean }>`
  font-size: ${props => (props.large ? '1.2em' : '0.8em')};
  display: flex;
  align-items: center;

  .avatar {
    margin-top: ${props => props.theme.spacing.small};
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const RightTop = styled.div`
  display: flex;
  border-bottom: #3e3e3e 1px solid;
  padding: ${props => props.theme.spacing.normal};

  ${Stat} {
    flex: 1;
  }
`;
const RightBottom = styled.div`
  padding: ${props => props.theme.spacing.normal};
`;
