import React from 'react';
import styled from '../../lib/styledComponents';

type Props = { className?: string };

const Footer: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      Copyright &copy; 2019 - Spot-movie.com
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing.normal} 0;
  color: #cacaca;

  @media (max-width: 790px) {
    padding: ${props => props.theme.spacing.normal};
  }
`;
