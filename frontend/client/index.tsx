import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink } = await import(
    '@apollo/client'
  );

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',

      fetch,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
    cache: new InMemoryCache({
      typePolicies: {
        UserProfile: {
          keyFields: ['id'],
        },
      },
    }),
  });
}

//  Cache ist Zwischenspeicher, der getStandaloneApolloClient wird nur bei build time benutzt.
