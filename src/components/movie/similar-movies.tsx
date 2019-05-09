import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import similar from '../../queries/similar';
import Loader from '../ui/loader';
import Poster from './poster';
import styled from '../../lib/styledComponents';
import Heading from '../ui/heading';

type Props = { externalId: number };
const SimilarMovies: React.SFC<Props> = ({ externalId }) => {
  return (
    <Query query={similar} variables={{ externalId }}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />;
        }

        if (!data.similar) {
          return null;
        }

        return (
          <React.Fragment>
            <Heading sectionTitle>Similar Movies</Heading>
            <Wrapper>
              {data.similar.map((item: any, index: number) => {
                let link = '';

                if (item.id === item.externalId) {
                  link = `/movie/${item.id}/true`;
                } else {
                  link = `/movie/${item.id}`;
                }
                return (
                  <Item key={index}>
                    <div>
                      <Poster image={item.poster} small />
                    </div>
                    <Link to={link}>{item.title}</Link>
                  </Item>
                );
              })}
            </Wrapper>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default SimilarMovies;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.normal};
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
