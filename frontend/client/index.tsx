import {
  ApolloClient,
  split,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client';

import { TokenRefreshLink } from 'apollo-link-token-refresh';

import {
  accessTokenExpired,
  fetchAccessToken,
  getAccessToken,
  setAccessToken,
} from '../helpers/Tokens';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from './WebSocket';

const wsLink = process.browser
  ? new WebSocketLink({
      url: 'ws://localhost:4000/graphql',
      connectionParams: () => {
        const token: string = getAccessToken();
        const accessToken: string = btoa(token);

        return {
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        };
      },
      keepAlive: 5_000,
    })
  : null;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const refreshLink: any = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => accessTokenExpired(),
  fetchAccessToken: () => fetchAccessToken(),
  handleFetch: (accessToken: string) => setAccessToken(accessToken),
  handleResponse: (operation, accessTokenField) => (response) => {
    if (!response) return { accessToken: null };

    return { accessToken: response.data?.updateTokens?.accessToken };
  },
  handleError: (err: Error) => {
    console.log('An error occurred');
    console.log(err);
  },
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken().valueOf();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export function createApolloClient(initialState, ctx) {
  const ssrMode = Boolean(ctx);

  let link: ApolloLink;
  if (ssrMode) {
    link = from([refreshLink, authLink, errorLink, httpLink]);
  } else {
    link = from([refreshLink, authLink, errorLink, splitLink]);
  }

  return new ApolloClient({
    ssrMode: ssrMode,
    link: link,
    cache: new InMemoryCache().restore(initialState),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}
