import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Hero } from '../components/Layout/Hero';
import { Navbar } from '../components/Auth/Navbar';
import { Welcome } from '../components/Intro/Welcome';
import { Context } from '../reducer';
import { getCurrentUserQ, getListsQ, getProfilesQ } from '../graphql/Queries';

export default function Index() {
  const authContext = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = JSON.parse(authContext.authState);
    setAuth(isAuth);
  });

  const profile = useQuery(getCurrentUserQ);
  const allProfiles = useQuery(getProfilesQ);
  const allLists = useQuery(getListsQ);

  return (
    <>
      <Head>
        <title>aniProfile - Homepage</title>
      </Head>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        {auth ? (
          <>
            <Hero props={allProfiles} list={allLists} profile={profile} />
          </>
        ) : (
          <Welcome />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getProfilesQ,
  });

  await client.query({
    query: getCurrentUserQ,
  });

  await client.query({
    query: getListsQ,
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  };
}
