import React from 'react';
import Authenticated from '@/components/login/authenticated';
import { Switch, Route, RouteComponentProps, Link } from 'react-router-dom';
import AdminMoviesPage from './pages/admin-movies';
import AdminDashboardPage from './pages/admin-dashboard';
import DefaultLayout from '@/components/layout/default-layout';

type Props = {} & RouteComponentProps;
const AdminPage: React.SFC<Props> = ({ match }) => {
  return (
    <Authenticated>
      <DefaultLayout>
        <h3>Administrator</h3>
        <Link to="/admin/movies">Movies</Link>
        <Switch>
          <Route path={`${match.url}/movies`} component={AdminMoviesPage} />
          <Route path={`${match.url}`} component={AdminDashboardPage} />
        </Switch>
      </DefaultLayout>
    </Authenticated>
  );
};

export default AdminPage;
