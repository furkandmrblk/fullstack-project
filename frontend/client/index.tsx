import {
  ApolloClient,
  split,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
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

// import { WebSocketLink } from '@apollo/client/link/ws';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from './WebSocket';
import WebSocket from 'ws';

const wsLink = new WebSocketLink({
  url: 'ws://localhost:4000/graphql',
  connectionParams: () => {
    const accessToken = getAccessToken().valueOf();

    if (!accessToken) return {};

    return {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    };
  },
  webSocketImpl: WebSocket,
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

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

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: from([refreshLink, authLink, errorLink, splitLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
