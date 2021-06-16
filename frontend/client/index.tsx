import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
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

const refreshLink = new TokenRefreshLink({
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

    // Implement logout()
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

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: from([refreshLink, authLink, errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export async function getStandaloneApolloClient() {
  // const { ApolloClient, InMemoryCache, HttpLink } = await import(
  //   '@apollo/client'
  // );

  // const httpLink = new HttpLink({
  //   uri: 'http://localhost:4000/graphql',
  //   credentials: 'include',
  // });

  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({
      typePolicies: {
        UserProfile: {
          keyFields: ['id'],
        },
      },
    }),
    link: from([refreshLink, authLink, errorLink, httpLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

//  Cache ist Zwischenspeicher, der getStandaloneApolloClient wird nur bei build time benutzt.
