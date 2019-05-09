import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Footer from '@/components/layout/footer';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/header';
import Avatar from '@/components/ui/avatar';
import styled from '@/lib/styledComponents';
import Search from './search';
import logo from './logo.png';
import { Query } from 'react-apollo';
import AppStateContext from '@/components/layout/app-state-context';

type Props = {};
const Layout: React.SFC<Props> = ({ children }) => {
  const { auth } = useContext(AppStateContext);
  return (
    <Wrapper>
      <Sidebar>
        <UserInfo>
          <UserInfoTop>
            <Link to="/profile">
              <Avatar
                name="John Doe"
                view="md"
                avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5s9k57Nd5TlClPRU_13nimqHCnt0J68q51T9aSz884X0raGi"
              />
            </Link>
          </UserInfoTop>
          <h3>
            <Link to="/profile">Markus Hederström</Link>
          </h3>
        </UserInfo>
        <Navigation>
          <li>
            <Link to="/search">
              <Info>
                <Icon icon="search" fixedWidth />
                Search
              </Info>
            </Link>
          </li>
          <li>
            <Link to="/browse">
              <Info>
                <Icon icon="film" fixedWidth />
                Browse
              </Info>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Info>
                <Icon icon="star" fixedWidth />
                TV Shows
              </Info>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Info>
                <Icon icon="film" fixedWidth />
                Games
              </Info>
            </Link>
          </li>
        </Navigation>
        <Divider />
        <Navigation>
          <li>
            <Link to="/profile/favorites">
              <Info>
                <Icon icon={['far', 'bookmark']} fixedWidth />
                Bookmarks
              </Info>
              <Attribute>25</Attribute>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Info>
                <Icon icon="film" fixedWidth />
                Movies
              </Info>
            </Link>
          </li>
          {auth && (
            <li>
              <Link to="/admin">
                <Info>
                  <Icon icon="star" fixedWidth />
                  Admin
                </Info>
              </Link>
            </li>
          )}
          <li>
            <Link to="/">
              <Info>
                <Icon icon="film" fixedWidth />
                Games
              </Info>
            </Link>
          </li>
        </Navigation>
        <LogoutContainer>
          {auth ? (
            <Link to="/signout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </LogoutContainer>
      </Sidebar>

      <Main>
        <Header>
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

const Sidebar = styled.div`
  flex: 1;
  max-width: 200px;
  /* position: relative; */
`;
const Main = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.normal};
  box-sizing: border-box;
  max-width: calc(100% - 200px);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${props => props.theme.spacing.normal};

  h3 {
    font-weight: 300;

    a {
      transition: color 200ms ease-in-out;
      text-decoration: none;
      color: #fff;

      &:hover {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
`;

const UserInfoTop = styled.div`
  margin: ${props => props.theme.spacing.normal};
`;

const Navigation = styled.ul`
  color: #cacaca;

  li {
    margin-bottom: ${props => props.theme.spacing.small};

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-left: transparent 4px solid;
      color: #cacaca;
      text-decoration: none;
      padding: 0 ${props => props.theme.spacing.normal};

      &:hover {
        border-left: 4px solid ${props => props.theme.colors.primary};
        color: #fff;
      }

      i,
      svg {
        margin-right: ${props => props.theme.spacing.small};
      }
    }
  }
`;

const Info = styled.span``;

const Attribute = styled.span`
  border: #4f4f4f 1px solid;
  color: ${props => props.theme.colors.primary};
  margin-right: ${props => props.theme.spacing.small};
  padding: ${props => props.theme.spacing.tiny};
  font-size: 0.8em;
`;

const Divider = styled.div`
  background: #3e3e3e;
  height: 2px;
  margin: ${props => props.theme.spacing.large}
    ${props => props.theme.spacing.normal};
`;

const LogoutContainer = styled.div`
  /* position: absolute; */
  /* bottom: 20px; */
  /* left: 20px; */
  margin: ${props => props.theme.spacing.normal};
  text-align: right;

  a {
    color: #cacaca;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }
`;

const Content = styled.div`
  min-height: 100%;
  box-sizing: border-box;
  padding-top: ${props => props.theme.spacing.huge};
  /* display: flex;
  align-items: flex-start;
  height: 100%; */
`;
