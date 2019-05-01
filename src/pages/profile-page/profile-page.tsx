import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route, RouteComponentProps, Link } from 'react-router-dom';

import Loader from '@/components/ui/loader';
import DefaultLayout from '@/components/layout/default-layout';
import me from '@/queries/me';
import Authenticated from '@/components/login/authenticated';
import FavoritePage from './pages/favorites';

type Props = {};
const ProfilePage: React.SFC<Props & RouteComponentProps> = ({ match }) => {
  return (
    <DefaultLayout>
      <Authenticated>
        <h3>Profile Page</h3>
        <Link to="/profile/favorites">Favorites</Link>
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
              </Switch>
            );
          }}
        </Query>
      </Authenticated>
    </DefaultLayout>
  );
};

export default ProfilePage;
