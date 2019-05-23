import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import styled from '@/lib/styledComponents';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Search from './search';
import logo from './logo.png';
import AppStateContext from '@/components/layout/app-state-context';
import SidebarTablet from '@/components/layout/sidebar/sidebar-tablet';
import Sidebar from '@/components/layout/sidebar/sidebar';

type Props = {};
const Layout: React.SFC<Props> = ({ children }) => {
  const { auth } = useContext(AppStateContext);
  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar auth={auth} />
      </SidebarWrapper>

      <Main>
        <Header>
          <SidebarTablet auth={auth} />

          <Link to="/">
            <img src={logo} alt="Logo" style={{ maxWidth: 200 }} />
          </Link>
          <SearchContainer>
            <Search />
          </SearchContainer>
        </Header>
        <Content>{children}</Content>
        <div>
          <Footer />
        </div>
      </Main>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Header = styled.header`
  display: flex;

  a {
    display: flex;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  margin-left: ${props => props.theme.spacing.normal};

  input {
    background-color: #343434;
    border: #404040 1px solid;
    border-radius: ${props => props.theme.radius};
    color: #fff;
  }
`;

const SidebarWrapper = styled.div`
  flex: 1;
  max-width: 200px;

  @media (max-width: 790px) {
    display: none;
  }
`;
const Main = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.normal};
  box-sizing: border-box;
  max-width: calc(100% - 200px);

  @media (max-width: 790px) {
    max-width: 100%;
    padding: ${props => props.theme.spacing.normal} 0;
  }
`;

const Content = styled.div`
  min-height: 100%;
  box-sizing: border-box;
  padding-top: ${props => props.theme.spacing.huge};

  @media (max-width: 790px) {
    padding: ${props => props.theme.spacing.large};
  }
  /* display: flex;
  align-items: flex-start;
  height: 100%; */
`;
