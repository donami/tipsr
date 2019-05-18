import React from 'react';

import Heading from './heading';
import styled from '@/lib/styledComponents';
import Loader from './loader';

type Props = {
  renderItem: (item: any) => any;
  items: any;
  loading?: boolean;
  title?: string;
  className?: string;
};
const HorizontalList: React.SFC<Props> = ({
  renderItem,
  items,
  title,
  loading = false,
  className,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!items) {
    return null;
  }
  return (
    <div className={className || 'horizontal-list'}>
      {title && <Heading sectionTitle>{title}</Heading>}
      <Wrapper>
        {items.map((item: any, index: number) => {
          return <Item key={index}>{renderItem(item)}</Item>;
        })}
      </Wrapper>
    </div>
  );
};

export default HorizontalList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.normal};
  margin-bottom: ${props => props.theme.spacing.normal};
`;
const Item = styled.div`
  flex: 0 0 auto;
  display: flex;
  max-width: 240px;
  margin-right: ${props => props.theme.spacing.large};

  &:last-child {
    margin-right: 0;
  }

  > div {
    flex: 1;
  }

  img {
    width: unset;
  }

  a {
    margin-left: ${props => props.theme.spacing.normal};
    flex: 2;
    text-decoration: none;
  }
`;
