import { ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from './WebSocket';

export async function getStandaloneApolloClient(initialState, ctx) {
  const { ApolloClient, InMemoryCache, HttpLink, from } = await import(
    '@apollo/client'
  );

  const { setContext } = await import('@apollo/client/link/context');
  const { onError } = await import('@apollo/client/link/error');

  const { TokenRefreshLink } = await import('apollo-link-token-refresh');

  const {
    accessTokenExpired,
    fetchAccessToken,
    getAccessToken,
    setAccessToken,
  } = await import('../helpers/Tokens');

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

  const httpLink = new HttpLink({
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
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
}
