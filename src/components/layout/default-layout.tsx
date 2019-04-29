import React from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import styled from '@/lib/styledComponents';

type Props = {};

const Layout: React.SFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <div>Header</div>
      <Wrapper>{children}</Wrapper>
      <div>Footer</div>
    </React.Fragment>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;
