import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Heading from '../../components/ui/heading';
import DefaultLayout from '../../components/layout/default-layout';
import Loader from '../../components/ui/loader';
import upcoming from '@/queries/upcoming';
import styled from '@/lib/styledComponents';
import Poster from '@/components/movie/poster';

type Props = {};
const UpcomingPage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Wrapper>
        <Heading sectionTitle>Upcoming</Heading>
        <Query query={upcoming}>
          {({ data, loading }) => {
            if (loading) {
              return <Loader />;
            }

            return (
              <>
                {data.upcoming.movies.map(item => {
                  let link = '';
                  if (item.id === item.externalId) {
                    link = `/movie/${item.id}/true`;
                  } else {
                    link = `/movie/${item.id}`;
                  }
                  return (
                    <Movie key={item.id}>
                      <PosterWrapper>
                        <Link to={link}>
                          <Poster image={item.poster} />
                        </Link>
                      </PosterWrapper>
                      <InfoWrapper>
                        <h4>
                          <Link to={link}>{item.title}</Link>
                        </h4>
                        <p>{item.description}</p>
                      </InfoWrapper>
                    </Movie>
                  );
                })}
              </>
            );
          }}
        </Query>
      </Wrapper>
    </DefaultLayout>
  );
};

export default UpcomingPage;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};
`;

const Movie = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.normal};
`;
const PosterWrapper = styled.div`
  margin-right: ${props => props.theme.spacing.normal};

  img {
    transition: all 200ms ease-in-out;
    max-width: 140px;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const InfoWrapper = styled.div`
  flex: 1;

  h4,
  h4 a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }
`;
