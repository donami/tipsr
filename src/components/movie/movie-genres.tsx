import React from 'react';
import styled from '@/lib/styledComponents';

type Props = {
  genres: any[];
  className?: string;
};
const MovieGenres: React.SFC<Props> = ({ genres, className }) => {
  if (!genres || !genres.length) {
    return null;
  }

  return (
    <Wrapper className={className || 'movie-genres'}>
      {genres && !!genres.length && (
        <>
          {genres.map((genre, index) => (
            <React.Fragment key={genre.id}>
              <span className="genre">{genre.name}</span>
              {index !== genres.length - 1 && <span> | </span>}
            </React.Fragment>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default MovieGenres;

const Wrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
  .genre {
    color: ${props => props.theme.colors.primary};
    margin: 0 ${props => props.theme.spacing.small};

    &:first-child {
      margin-left: 0;
    }
  }
`;
