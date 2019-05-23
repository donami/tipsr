// Server entrypoint

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import 'cross-fetch/polyfill';

import { Context } from 'koa';

import * as React from 'react';
import jwt from 'jsonwebtoken';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

// React utility to transform JSX to HTML (to send back to the client)
import * as ReactDOMServer from 'react-dom/server';

// <Helmet> component for retrieving <head> section, so we can set page
// title, meta info, etc along with the initial HTML
import Helmet from 'react-helmet';

import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/* Local */
import Root from '@/components/root';
import { createClient } from '@/graphql/apollo';
import Output from '@/lib/output';
import { ThemeProvider } from '@/lib/styledComponents';
import defaultTheme from '@/themes/default';
import Html from '@/views/ssr';
import me from '../queries/me';
import getCurrentCredential from '../queries/get-current-credential';

// ----------------------------------------------------------------------------

// Types
export interface IRouterContext {
  status?: number;
  url?: string;
}

const COOKIE_KEY = 'token';
const JWT_SECRET_KEY = 'secret';

export default function(output: Output) {
  // Create Koa middleware to handle React requests
  return async (ctx: Context) => {
    // Create a new Apollo client
    const client = createClient();

    // Create a new styled-components instance
    const sheet = new ServerStyleSheet();

    // Create a fresh 'context' for React Router
    const routerContext: IRouterContext = {};

    // This obtains the authentication credential from the signed cookie
    const token =
      ctx.cookies.get(COOKIE_KEY, {
        // signed: true,
      }) || '';
    let decoded = null;
    try {
      decoded = await jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      decoded = null;
    }

    const credential = decoded
      ? {
          ...decoded,
          token,
          __typename: 'Credential',
        }
      : null;

    client.writeQuery({
      query: getCurrentCredential,
      data: {
        credential,
      },
    });

    const components = (
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <StaticRouter location={ctx.request.url} context={routerContext}>
                <Root />
              </StaticRouter>
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </StyleSheetManager>
    );

    // Render the Apollo tree
    await getDataFromTree(components);

    // Handle redirects
    if ([301, 302].includes(routerContext.status!)) {
      // 301 = permanent redirect, 302 = temporary
      ctx.status = routerContext.status!;

      // Issue the new `Location:` header
      ctx.redirect(routerContext.url!);

      // Return early -- no need to set a response body
      return;
    }

    // Handle 404 Not Found
    if (routerContext.status === 404) {
      // By default, just set the status code to 404. You can
      // modify this section to do things like log errors to a
      // third-party, or redirect users to a dedicated 404 page

      ctx.status = 404;
      ctx.body = 'Not found';

      return;
    }

    // Create response HTML
    const html = ReactDOMServer.renderToString(components);

    // Create the React render via React Helmet
    const reactRender = ReactDOMServer.renderToString(
      <Html
        css={output.client.main('css')!}
        helmet={Helmet.renderStatic()}
        html={html}
        js={output.client.main('js')!}
        styles={sheet.getStyleElement()}
        window={{
          __APOLLO_STATE__: client.extract(),
        }}
      />
    );

    // Set the return type to `text/html`, and stream the response back to
    // the client
    ctx.type = 'text/html';
    ctx.body = `<!DOCTYPE html>${reactRender}`;
  };
}
