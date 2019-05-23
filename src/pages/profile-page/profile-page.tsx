import React, { useContext, useState } from 'react';
import { Query } from 'react-apollo';
import { Switch, Route, RouteComponentProps, Link } from 'react-router-dom';

import Loader from '@/components/ui/loader';
import DefaultLayout from '@/components/layout/default-layout';
import me from '@/queries/me';
import Authenticated from '@/components/login/authenticated';
import FavoritePage from './pages/favorites';
import ListsPage from './pages/lists';
import ListPage from './pages/list';
import AppStateContext from '@/components/layout/app-state-context';
import styled, { css } from '@/lib/styledComponents';
import Avatar from '../../components/ui/avatar';

type Props = {};
const ProfilePage: React.SFC<Props & RouteComponentProps> = ({
  match,
  location,
}) => {
  const { auth } = useContext(AppStateContext);

  return (
    <DefaultLayout>
      <Authenticated>
        <Wrapper>
          <Top>
            <ProfilePictureWrapper>
              <Avatar name={`${auth.firstName} ${auth.lastName}`} view="xl" />
            </ProfilePictureWrapper>
            <ProfileDetailsWrapper>
              <h4 className="full-name">
                {`${auth.firstName} ${auth.lastName}`}
              </h4>
              <Stats>
                <div>
                  <span>0</span> reviews
                </div>
                <div>
                  <span>0</span> followers
                </div>
                <div>
                  <span>0</span> reviews
                </div>
              </Stats>
            </ProfileDetailsWrapper>
            <Actions>{/* Send Message */}</Actions>
          </Top>
          <Bar>
            <BarItem
              to="/profile/favorites"
              current={
                location.pathname === '/profile/favorites' ||
                location.pathname === '/profile'
              }
            >
              Favorites
            </BarItem>
            <BarItem
              current={
                location.pathname === '/profile/lists' ||
                location.pathname.indexOf('/profile/list/1') > -1
              }
              to="/profile/lists"
            >
              Lists
            </BarItem>
          </Bar>
          <Content>
            <Query query={me}>
              {({ data, loading }) => {
                if (loading) {
                  return <Loader />;
                }

                return (
                  <Switch>
                    <Route
                      path={`${match.url}/favorites`}
                      component={FavoritePage}
                    />
                    <Route
                      path={`${match.url}/list/:id`}
                      component={ListPage}
                    />
                    <Route path={`${match.url}/lists`} component={ListsPage} />
                    <Route path={`/profile`} component={FavoritePage} />
                  </Switch>
                );
              }}
            </Query>
          </Content>
        </Wrapper>
      </Authenticated>
    </DefaultLayout>
  );
};

export default ProfilePage;

const Wrapper = styled.div``;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.large};
  background-color: #2e2e2e;
`;

const ProfilePictureWrapper = styled.div`
  flex: 2;
  flex-grow: 0;
  margin-right: ${props => props.theme.spacing.large};
`;

const ProfileDetailsWrapper = styled.div`
  flex: 3;

  .full-name {
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: ${props => props.theme.spacing.normal};
  }
`;

const Actions = styled.div`
  flex: 1;
  text-align: right;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #555;
  flex-wrap: wrap;

  > div {
    @media (max-width: 600px) {
      min-width: 100%;
    }
  }

  span {
    font-size: 1.4em;
    margin-right: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.primary};
  }
`;

const Bar = styled.div`
  border-bottom: ${props => props.theme.colors.primary} 1px solid;
`;

const BarItem = styled(Link)<{ current: boolean }>`
  padding: ${props => props.theme.spacing.normal};
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }

  ${props => {
    if (props.current) {
      return css`
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
      `;
    }
    return null;
  }}
`;
