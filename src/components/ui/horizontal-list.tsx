import React from 'react';

import Heading from './heading';
import styled, { css } from '@/lib/styledComponents';
import Loader from './loader';

type Props = {
  renderItem: (item: any) => any;
  items: any;
  loading?: boolean;
  title?: string;
  className?: string;
  vertical?: boolean;
};
const HorizontalList: React.SFC<Props> = ({
  renderItem,
  items,
  title,
  vertical = false,
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
    <Wrapper className={className || 'horizontal-list'} vertical={vertical}>
      {title && <Heading sectionTitle>{title}</Heading>}
      <ItemList className="item-list">
        {items.map((item: any, index: number) => {
          return (
            <Item className="list-item" key={index}>
              {renderItem(item)}
            </Item>
          );
        })}
      </ItemList>
    </Wrapper>
  );
};

export default HorizontalList;

const Wrapper = styled.div<{ vertical: boolean }>`
  ${props => {
    if (props.vertical) {
      return css`
        box-sizing: border-box;
        background-color: #2e2e2e;
        padding: ${props => props.theme.spacing.normal};

        .item-list {
          display: flex;
          flex-wrap: wrap;
        }
        .list-item {
          flex: 1;
          min-width: 100%;
          margin-bottom: ${props => props.theme.spacing.normal};

          &:last-child {
            margin-bottom: 0;
          }

          > div {
            max-width: 15%;
          }
        }
      `;
    }
    return null;
  }}
`;

const ItemList = styled.div`
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
