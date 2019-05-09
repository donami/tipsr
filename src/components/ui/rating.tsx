import React, { useState } from 'react';
import Icon from './icon';
import styled from '@/lib/styledComponents';

const RatingItem: React.SFC<{
  filled: boolean;
  value: number;
  onClick: () => void;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
}> = ({ filled, value, onMouseEnter, onMouseLeave, ...rest }) => {
  return (
    <Star
      className={filled ? 'star-filled' : 'star-empty'}
      onMouseEnter={e => {
        if (onMouseEnter) {
          onMouseEnter(e);
        }
      }}
      onMouseLeave={e => {
        if (onMouseLeave) {
          onMouseLeave(e);
        }
      }}
      {...rest}
    >
      {filled && <Icon size="lg" icon="star" />}
      {!filled && <Icon size="lg" icon={['far', 'star']} />}
    </Star>
  );
};

type Props = {
  initialRating?: number;
  voteAverage?: number;
  className?: string;
};
const Rating: React.SFC<Props> = ({
  initialRating,
  voteAverage,
  className,
}) => {
  let roundedRating = 5;
  if (initialRating) {
    roundedRating = Math.round(initialRating);
  } else if (voteAverage) {
    roundedRating = Math.round(voteAverage);
  }

  const [vote, setVote] = useState<number | null>(null);
  const [hoverValue, setHoverValue] = useState<number>(0);

  const isFilled = (value: number) => {
    if (hoverValue > 0) {
      return value <= hoverValue;
    }
    if (vote) {
      return value <= vote;
    }
    return value <= roundedRating;
  };

  return (
    <Stars className={className}>
      {[...Array(10)].map((_, index) => (
        <RatingItem
          key={index}
          filled={isFilled(index + 1)}
          value={index}
          onMouseEnter={e => {
            const value = index + 1;
            if (value !== hoverValue) {
              setHoverValue(value);
            }
          }}
          onMouseLeave={e => {
            setHoverValue(0);
          }}
          onClick={() => {
            setVote(index + 1);
          }}
        />
      ))}
    </Stars>
  );
};

export default Rating;

const Stars = styled.div`
  display: inline-block;
`;

const Star = styled.div`
  display: inline;
  cursor: pointer;
`;
