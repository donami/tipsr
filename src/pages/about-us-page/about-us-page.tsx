import React from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '@/components/ui/heading';
import styled from '@/lib/styledComponents';

type Props = {};
const AboutUsPage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Wrapper>
        <Heading sectionTitle>About Us</Heading>
        <Content>
          <p>
            Welcome to <em>Spotmovie</em>, your number one source for finding
            your next favorite movie. We're dedicated to providing you the very
            best of movie recommendations, with an emphasis on quality and
            uniqueness.
          </p>
          <p>
            Founded in 2018, Spotmovie has come a long way from its beginnings
            in Sweden. When they first started out, their passion for movies
            drove them to start their own movie recommendation engine.
          </p>
          <p>
            We hope you enjoy our application as much as we enjoy offering them
            to you. If you have any questions or comments, please don't hesitate
            to contact us.
          </p>
          <em>Sincerely,</em> <br />
          <br />
          <em>Spotmovie team.</em>
        </Content>
      </Wrapper>
    </DefaultLayout>
  );
};

export default AboutUsPage;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};
`;

const Content = styled.div`
  max-width: 70%;
  ul {
    margin-left: ${props => props.theme.spacing.huge};
    margin-bottom: ${props => props.theme.spacing.normal};
  }

  p {
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.normal};
  }

  h1,
  h2,
  h3 {
    margin-bottom: ${props => props.theme.spacing.small};
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    font-weight: 300;
  }
`;
