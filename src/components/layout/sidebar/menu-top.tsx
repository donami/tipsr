import React from 'react';

import styled from '../../../lib/styledComponents';

type Props = { auth: any };
const MenuTop: React.SFC<Props> = ({ auth }) => {
  return !auth ? (
    <Wrapper>
      <h3>Menu</h3>
    </Wrapper>
  ) : null;
};

export default MenuTop;

const Wrapper = styled.div`
  margin: ${props => props.theme.spacing.large} 0;

  h3 {
    text-align: center;
    font-weight: 300;
    text-transform: uppercase;
  }
`;
