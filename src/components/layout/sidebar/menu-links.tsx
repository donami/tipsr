import React from 'react';
import styled from '@/lib/styledComponents';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import favorites from '../../../queries/favorites';
import Icon from '../../ui/icon';

type Props = { auth: any };
const MenuLinks: React.SFC<Props> = ({ auth }) => {
  return (
    <>
      <Navigation>
        {/* <li>
            <Link to="/search">
              <Info>
                <Icon icon="search" fixedWidth />
                Search
              </Info>
            </Link>
          </li> */}
        <li>
          <Link to="/browse">
            <Info>
              {/* <Icon icon="film" fixedWidth /> */}
              Browse
            </Info>
          </Link>
        </li>
        <li>
          <Link to="/upcoming">
            <Info>
              {/* <Icon icon="film" fixedWidth /> */}
              Upcoming
            </Info>
          </Link>
        </li>
        <li>
          <Link to="/suggest">
            <Info>
              {/* <Icon icon="film" fixedWidth /> */}
              Discover
            </Info>
          </Link>
        </li>
        <li>
          <Link to="/discuss">
            <Info>
              {/* <Icon icon="film" fixedWidth /> */}
              Discuss
            </Info>
          </Link>
        </li>
        {/* <li>
            <Link to="/watch-later">
              <Info>
                Watch Later
              </Info>
            </Link>
          </li> */}
      </Navigation>
      <Divider />
      <Navigation>
        {auth && (
          <Query query={favorites}>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }
              return (
                <li>
                  <Link to="/profile/favorites">
                    <Info>
                      <Icon icon={['far', 'bookmark']} fixedWidth />
                      Bookmarks
                    </Info>
                    <Attribute>
                      {data.favorites ? data.favorites.length : 0}
                    </Attribute>
                  </Link>
                </li>
              );
            }}
          </Query>
        )}
        {auth && auth.role === 'SYSADMIN' && (
          <li>
            <Link to="/admin">
              <Info>
                <Icon icon="star" fixedWidth />
                Admin
              </Info>
            </Link>
          </li>
        )}
        {!auth && (
          <li>
            <Link to="/signup">
              <Info>
                {/* <Icon icon={['far', 'bookmark']} fixedWidth /> */}
                Signup
              </Info>
            </Link>
          </li>
        )}
      </Navigation>
      <LogoutContainer className="auth-link">
        {auth ? (
          <Link to="/signout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </LogoutContainer>
    </>
  );
};

export default MenuLinks;

const Info = styled.span``;

const Attribute = styled.span`
  border: #4f4f4f 1px solid;
  color: ${props => props.theme.colors.primary};
  margin-right: ${props => props.theme.spacing.small};
  padding: ${props => props.theme.spacing.tiny};
  font-size: 0.8em;
  min-width: 12.5px;
  text-align: center;
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
