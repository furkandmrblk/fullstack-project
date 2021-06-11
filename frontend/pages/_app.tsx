import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import AuthReducer, { Context, initialState } from '../reducer';
import { useContext, useEffect, useReducer } from 'react';
import { client } from '../client';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
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
        <Head>{/* Insert google fonts link here */}</Head>

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
