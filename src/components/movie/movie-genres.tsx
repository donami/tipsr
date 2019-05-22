import React from 'react';
import styled from '@/lib/styledComponents';

type Props = {
  genres: any[];
};
const MovieGenres: React.SFC<Props> = ({ genres }) => {
  if (!genres || !genres.length) {
    return null;
  }

  return (
    <Wrapper>
      {genres && !!genres.length && (
        <>
          {genres.map((genre, index) => (
            <>
              <span className="genre" key={genre.name}>
                {genre.name}
              </span>
              {index !== genres.length - 1 && <span> | </span>}
            </>
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
