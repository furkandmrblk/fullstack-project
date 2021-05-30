import Head from 'next/head';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';

export default function Index() {
  return (
    <>
      <Head>
        <title>aniProfile - Homepage</title>
      </Head>
      <Navbar />
      <Hero />
    </>
  );
}
