// import React from 'react';
// import styled, { css } from '@/lib/styledComponents';

// type Props = {
//   image: string;
//   tiny?: boolean;
//   small?: boolean;
//   medium?: boolean;
//   large?: boolean;
// };
// const Avatar: React.SFC<Props> = ({ image, ...rest }) => {
//   return <StyledImage src={image} alt="Avatar" {...rest} />;
// };

// export default Avatar;

// const StyledImage = styled.img`
//   position: relative;
//   display: block;
//   vertical-align: middle;
//   max-width: 100%;
//   background-color: transparent;
//   overflow: hidden;
//   border-radius: 500rem;
//   width: 96px;
//   height: auto;
//   font-size: 1rem;

//   ${props => {
//     if (props.tiny) {
//       return css`
//         width: 32px;
//       `;
//     }
//     if (props.small) {
//       return css`
//         width: 48px;
//       `;
//     }
//     if (props.medium) {
//       return css`
//         width: 96px;
//       `;
//     }
//     if (props.large) {
//       return css`
//         width: 128px;
//       `;
//     }
//     return null;
//   }}
// `;

import React from 'react';
import initials from 'initials';
import addPx from 'add-px';
import contrast from 'contrast';

import styled, { css } from '@/lib/styledComponents';
const fullName = (user: any) => {
  return `${user.firstName} ${user.lastName}`;
};

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

type AvatarFile = {
  id: string;
  url: string;
};

function sumChars(str: string) {
  let sum = 0;
  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}
type Props = {
  borderRadius?: string;
  src?: string;
  srcset?: any;
  user?: {
    id: string;
    image: AvatarFile;
    firstName: string;
    lastName: string;
  };
  name?: string;
  color?: string;
  colors?: string[];
  size?: string;
  style?: any;
  onClick?: any;
  className?: string;
  avatar?: string;
  view?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizeMap = {
  xs: '16',
  sm: '32',
  md: '48',
  lg: '64',
  xl: '128',
};

class Avatar extends React.Component<Props> {
  render() {
    const {
      borderRadius = '100%',
      src: initialSrc,
      srcset,
      name: initialName,
      color,
      colors = defaultColors,
      size: initialSize,
      style,
      avatar,
      onClick,
      className,
      view,
      user,
    } = this.props;

    let src = initialSrc;
    let name = initialName;

    if (user) {
      if (user.image && user.image.url) {
        src = user.image.url;
      }
      name = fullName(user);
    }

    if (!name) {
      throw new Error('Name is required by the avatar component.');
    }

    const sizeFromView = view && sizeMap[view];

    const abbr = initials(name);
    const size = initialSize ? addPx(initialSize) : addPx(sizeFromView);

    const imageStyle: any = {
      borderRadius,
      display: 'block',
    };

    const textSizeRatio = 3;

    const innerStyle: any = {
      borderRadius,
      lineHeight: size,
      textAlign: 'center',
    };

    if (initialSize) {
      innerStyle.fontSize = Math.floor(+initialSize / textSizeRatio);
    } else if (view && sizeMap[view]) {
      innerStyle.fontSize = Math.floor(+sizeMap[view] / textSizeRatio);
    }

    if (size) {
      imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
      imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
    }

    let inner;
    if (src || srcset || avatar) {
      const imgSrc = avatar || src;
      inner = (
        <AvatarImage
          className="avatar-image"
          style={{
            backgroundImage: `url(${imgSrc})`,
            ...imageStyle,
            margin: 0,
          }}
          alt={name}
        />
      );
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        const i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = abbr;
    }

    let contrastStyle;
    if (innerStyle.backgroundColor) {
      contrastStyle = contrast(innerStyle.backgroundColor);
    }

    return (
      <Container
        aria-label={name}
        className="avatar"
        style={style}
        contrast={contrastStyle}
      >
        <Inner style={innerStyle}>{inner}</Inner>
      </Container>
    );
  }
}

export default Avatar;

const Inner = styled.div`
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.div<{ contrast?: string }>`
  display: inline-block;
  color: ${({ contrast }) => (contrast === 'light' ? 'gray' : 'white')};

  ${props => {
    if (props.contrast && props.contrast === 'light') {
      return css`
        ${Inner} {
          border: 1px solid lightgray;
        }
      `;
    }
    return null;
  }}
`;

const AvatarImage = styled.div`
  width: 60px;
  height: 60px;
  -webkit-border-radius: 60px;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 60px;
  -moz-background-clip: padding;
  border-radius: 60px;
  background-clip: padding-box;
  margin: 7px 0 0 5px;
  float: left;
  background-size: cover;
  background-position: center center;
`;
