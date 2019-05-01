// Routes

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// We're using `react-router-dom` to handle routing, so grab the `RouteProps`
// type that we'll use to ensure our own types conform to the expected configuration
import { RouteProps } from 'react-router-dom';

/* Local */

// Components

// By default, pull in the ReactQL example. In your own project, just nix
// the `src/components/example` folder and replace the following line with
// your own React components
import HomePage from '../pages/home-page/home-page';
import LoginPage from '../pages/login-page/login-page';
import SignupPage from '../pages/signup-page/signup-page';
import AdminPage from '../pages/admin-page/admin-page';
import SignOutPage from '../pages/sign-out-page/sign-out-page';
import BrowsePage from '../pages/browse-page/browse-page';
import ProfilePage from '../pages/profile-page/profile-page';
import MoviePage from '../pages/movie-page/movie-page';

// ----------------------------------------------------------------------------

// Specify the routes. This is provided as an array of `RouteProp`, which is
// a type provided by `react-router-dom` for rendering a route. Typically, this
// will contain at least a component and a path
const routes: RouteProps[] = [
  {
    component: MoviePage,
    exact: true,
    path: '/movie/:id',
  },
  {
    component: BrowsePage,
    exact: true,
    path: '/browse',
  },
  {
    component: ProfilePage,
    // exact: true,
    path: '/profile',
  },
  {
    component: AdminPage,
    // exact: true,
    path: '/admin',
  },
  {
    component: LoginPage,
    exact: true,
    path: '/login',
  },
  {
    component: SignupPage,
    exact: true,
    path: '/signup',
  },
  {
    component: SignOutPage,
    exact: true,
    path: '/signout',
  },
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
];

export default routes;
