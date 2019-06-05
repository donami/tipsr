import React from 'react';
import { formatDate } from '../../../lib/helpers';
import styled from '../../../lib/styledComponents';
import { Link } from 'react-router-dom';
import Avatar from '@/components/ui/avatar';
import { slugify } from '@/lib/helpers';

type Props = { category: any };
const CategoryItem: React.SFC<Props> = ({ category }) => {
  return (
    <Wrapper>
      <Link to={`/discuss/${category.id}-${slugify(category.title)}`}>
        {category.title}
      </Link>
    </Wrapper>
  );
};

export default CategoryItem;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  margin-bottom: ${props => props.theme.spacing.normal};
  border-radius: 4px;
  padding: ${props => props.theme.spacing.normal};
`;
