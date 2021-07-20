import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { getMaxListeners } from 'process';
import { useEffect } from 'react';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { UserProfile } from '../components/Userprofile/UserProfile';
import { addListM } from '../graphql/Mutations';
import {
  getCurrentListQ,
  getCurrentUserProfileQ,
  getCurrentUserQ,
} from '../graphql/Queries';

export default function CurrentUserProfile() {
  const router = useRouter();

  const getList = useQuery(getCurrentListQ);
  const getCurrentUser = useQuery(getCurrentUserQ);
  const getProfile = useQuery(getCurrentUserProfileQ);

  if (getProfile.loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (getList.loading) {
    return <p>Loading...</p>;
  }

  if (getCurrentUser.loading) {
    return <p>Loading...</p>;
  }

  if (getProfile.data === undefined) {
    router.push('/createprofile');
  }

  const userProfile = getProfile.data.getCurrentUserProfile;
  const user = getCurrentUser.data.getCurrentUser;
  const listData = getList.data.getCurrentList;

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem] 2xl:mt-[4.55rem]">
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap items-center justify-center  w-auto pt-6 2xl:pt-9">
            <UserProfile props={userProfile} list={listData} />
          </div>
          <RightSidebar confetti={false} user={user} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getCurrentUserProfileQ,
  });
  await client.query({
    query: getCurrentListQ,
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  };
}
