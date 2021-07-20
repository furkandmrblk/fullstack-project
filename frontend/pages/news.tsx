import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { Main } from '../components/News/Main';
import { getCurrentUserQ, getProfilesQ } from '../graphql/Queries';

export default function News() {
  const profile = useQuery(getCurrentUserQ);
  if (profile.loading) return <p>Loading...</p>;

  const user = profile.data.getCurrentUser;

  return (
    <>
      <Head>
        <title>aniSpot - News</title>
      </Head>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem]">
          <LeftSidebar confetti={false} />
          <Main />
          <RightSidebar confetti={false} user={user} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getCurrentUserQ,
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  };
}
