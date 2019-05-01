import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import styled from '@/lib/styledComponents';
import Search from './search';

type Props = {};

const Layout: React.SFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <h3>Header</h3>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div>
          <Search />
        </div>
      </div>
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
