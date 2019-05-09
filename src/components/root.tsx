// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from 'react';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faPlusCircle,
  faPlusSquare,
  faEdit,
  faSearch,
  faFilm,
  faTrash,
  faHeart,
  faCut,
  faCaretRight,
  faCaretDown,
  faWindowClose,
  faStar,
  faArrowCircleLeft,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faStar as farStar,
  faHeart as farHeart,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';

/* Local */
import me from '@/queries/me';

// Components
import ScrollTop from '@/components/helpers/scrollTop';
import AppStateContext from '@/components/layout/app-state-context';
import { ModalProvider } from './modal';
import { ToastProvider } from './toasts/toast-manager';

// Global styles
import { GlobalStyles } from '@/global/styles';

// Routes
import routes from '@/data/routes';
import styled from '@/lib/styledComponents';
import getCurrentCredential from '../queries/get-current-credential';

// ----------------------------------------------------------------------------

library.add(
  faPlusCircle,
  faPlusSquare,
  faPlus,
  faBookmark,
  faStar,
  farStar,
  faHeart,
  farHeart,
  faFilm,
  faSearch,
  faEdit,
  faTrash,
  faExternalLinkAlt,
  faCut,
  faArrowCircleLeft,
  faWindowClose,
  faCaretRight,
  faCaretDown
);

const Root = () => (
  <Wrapper>
    <GlobalStyles />
    <Helmet>
      <title>Grabr.io</title>
    </Helmet>
    <ScrollTop>
      <Query query={getCurrentCredential} fetchPolicy="cache-only">
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          return (
            <AppStateContext.Provider value={{ auth: data.credential }}>
              <ToastProvider>
                <ModalProvider>
                  <Switch>
                    {routes.map(route => (
                      <Route key={route.path} {...route} />
                    ))}
                  </Switch>
                </ModalProvider>
              </ToastProvider>
            </AppStateContext.Provider>
          );
        }}
      </Query>
    </ScrollTop>
  </Wrapper>
);

export default hot(module)(Root);

const Wrapper = styled.div`
  overflow-x: hidden;
`;
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   background-color: #343434;
//   justify-content: space-between;
//   color: #fff;

//   .header {
//     height: 100px;
//     min-height: 100px;
//     max-height: 100px;
//   }
//   .content {
//     display: block;
//     flex: 1;
//   }
// `;
