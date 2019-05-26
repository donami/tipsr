import React from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '../../components/ui/heading';
import styled from '../../lib/styledComponents';
import Button from '../../components/ui/button';

type Props = {};
const SitemapPage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Wrapper>
        <Heading sectionTitle>Sitemap</Heading>

        <p>You can download our sitemap by clicking the button below.</p>

        <DownloadButton
          as="a"
          target="_blank"
          href="http://www.spot-movie.com/sitemap.xml"
        >
          Download sitemap
        </DownloadButton>
      </Wrapper>
    </DefaultLayout>
  );
};

export default SitemapPage;

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing.normal};
  background-color: #2e2e2e;

  p {
    margin: ${props => props.theme.spacing.normal} 0;
  }
`;

const DownloadButton = styled(Button)``;
