import React from 'react';
import styled from '../../lib/styledComponents';
import Icon from './icon';

type Props = { isFavorite: boolean };
const FavoriteIcon: React.SFC<Props> = ({ isFavorite }) => {
  return (
    <StyledIcon
      icon={[isFavorite ? 'fas' : 'far', 'heart']}
      isFavorite={isFavorite}
    />
  );
};

export default FavoriteIcon;

const StyledIcon = styled(Icon)<{ isFavorite: boolean }>`
  color: ${props => (props.isFavorite ? props.theme.colors.red : '#fff')};
`;
