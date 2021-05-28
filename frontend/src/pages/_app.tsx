import Head from 'next/head';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>{/* Insert google fonts link here */}</Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
