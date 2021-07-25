import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import AuthReducer, { Context, initialState } from '../reducer';
import { useContext, useEffect, useReducer } from 'react';
import { createApolloClient } from '../client';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient(initialState, Context);

  let localState = undefined;

  if (typeof window !== 'undefined') {
    localState = JSON.parse(localStorage.getItem('isAuth'));
  }

  const [isAuth, dispatch] = useReducer(
    AuthReducer,
    localState || initialState
  );

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Context.Provider
          value={{
            authState: isAuth,
            authDispatch: dispatch,
          }}
        >
          <Component {...pageProps} />
        </Context.Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
