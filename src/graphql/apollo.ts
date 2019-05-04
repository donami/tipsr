// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

/* Local */
import createState from './state';

// ----------------------------------------------------------------------------

const authMiddlewareLink = setContext((request, previousContext) => {
  const headers = {
    headers: {
      authorization:
        (typeof sessionStorage !== 'undefined' &&
          sessionStorage.getItem('token')) ||
        null,
      // [JWT.HEADER.TOKEN.NAME]:
      //   localStorage.getItem(JWT.LOCAL_STORAGE.TOKEN.NAME) || null,
      // [JWT.HEADER.REFRESH_TOKEN.NAME]:
      //   localStorage.getItem(JWT.LOCAL_STORAGE.REFRESH_TOKEN.NAME) || null, // eslint-disable-line
    },
  };

  console.log('headers', headers);

  // if (headers.headers[JWT.HEADER.REFRESH_TOKEN.NAME]) {
  //   const currentTime = Date.now().valueOf() / 1000;
  //   const tokenExpiration = decode(
  //     headers.headers[JWT.HEADER.REFRESH_TOKEN.NAME]
  //   ).exp;
  //   if (currentTime > tokenExpiration) {
  //     history.push('/login');
  //   }
  // }
  return headers;
});

const afterwareLink = new ApolloLink((operation, forward: any) =>
  forward(operation).map((response: any) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      const token = headers.get('authorization');
      // const refreshToken = headers.get(JWT.HEADER.REFRESH_TOKEN.NAME);

      if (token) {
        localStorage.setItem('token', token);
      }

      // if (refreshToken) {
      //   localStorage.setItem(
      //     JWT.LOCAL_STORAGE.REFRESH_TOKEN.NAME,
      //     refreshToken
      //   );
      // }
    }

    return response;
  })
);

export function createClient(): ApolloClient<NormalizedCacheObject> {
  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();

  // Create a HTTP client (both server/client). It takes the GraphQL
  // server from the `GRAPHQL` environment variable, which by default is
  // set to an external playground at https://graphqlhub.com/graphql
  const httpLink = new HttpLink({
    credentials: 'same-origin',
    uri: GRAPHQL,
  });

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if (!SERVER) {
    cache.restore((window as any).__APOLLO_STATE__);
  }

  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      // Connect local Apollo state. This is our primary mechanism for
      // managing 'flux'/local app data, in lieu of Redux or MobX
      createState(cache),

      afterwareLink,

      authMiddlewareLink,

      // Split on HTTP and WebSockets
      WS_SUBSCRIPTIONS && !SERVER
        ? split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            // Use WebSockets for subscriptions
            new WebSocketLink(
              // Replace http(s) with `ws` for connecting via WebSockts
              new SubscriptionClient(GRAPHQL.replace(/^https?/, 'ws'), {
                reconnect: true, // <-- automatically redirect as needed
              })
            ),
            // ... fall-back to HTTP for everything else
            httpLink
          )
        : httpLink, // <-- just use HTTP on the server
    ]),
    // On the server, enable SSR mode
    ssrMode: SERVER,
  });
}
