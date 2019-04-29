import React from 'react';
import Authenticated from '../../components/login/authenticated';
import { Switch, Route, RouteComponentProps, Link } from 'react-router-dom';
import AdminMoviesPage from './pages/admin-movies';
import AdminDashboardPage from './pages/admin-dashboard';

type Props = {} & RouteComponentProps;
const AdminPage: React.SFC<Props> = ({ match }) => {
  return (
    <Authenticated>
      <h3>AdminView</h3>
      <Link to="/admin/movies">Movies</Link>
      <Link to="/signout">Sign out</Link>
      <Switch>
        <Route path={`${match.url}/movies`} component={AdminMoviesPage} />
        <Route path={`${match.url}`} component={AdminDashboardPage} />
      </Switch>
    </Authenticated>
  );
};

export default AdminPage;
