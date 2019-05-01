import React from 'react';
import styled, { css } from '@/lib/styledComponents';

type Props = {
  image: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
};

const Poster: React.SFC<Props> = ({ image, ...rest }) => {
  return <StyledPoster src={image} alt="Image Poster" {...rest} />;
};

export default Poster;

const StyledPoster = styled.img<Props>`
  max-width: 100%;

  ${props => {
    if (props.small) {
      return css`
        width: 100px;
      `;
    }
    if (props.medium) {
      return css`
        width: 320px;
      `;
    }
    if (props.large) {
      return css`
        width: 550px;
      `;
    }
    return null;
  }}
`;

// export default StyledPoster;
