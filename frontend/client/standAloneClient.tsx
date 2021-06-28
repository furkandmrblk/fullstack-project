export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink, from, concat } = await import(
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

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

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

  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({
      typePolicies: {
        // UserProfile: {
        //   keyFields: [
        //     'id',
        //     'color',
        //     'description',
        //     'favoriteAnime',
        //     'favoriteManga',
        //     'favoriteChar',
        //   ],
        // },
        // User: {
        //   keyFields: ['id', 'username'],
        // },
      },
    }),
    link: from([refreshLink, authLink, errorLink, httpLink]),
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
