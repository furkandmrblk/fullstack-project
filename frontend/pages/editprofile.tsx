import { useState } from 'react';
import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { EditUserProfile } from '../components/Userprofile/EditUserProfile';
import { useQuery } from '@apollo/client';
import {
  getCurrentListQ,
  getCurrentUserProfileQ,
  getCurrentUserQ,
} from '../graphql/Queries';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Context, initialState } from '../reducer';

export default function EditProfilePage() {
  const getProfile = useQuery(getCurrentUserProfileQ);
  const currentUser = useQuery(getCurrentUserQ);

  if (getProfile.loading) {
    return <p>Loading...</p>;
  }
  if (currentUser.loading) {
    return <p>Loading...</p>;
  }

  const profile = getProfile.data.getCurrentUserProfile;
  const user = currentUser.data.getCurrentUser;

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />

        <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem] 2xl:mt-[4.55rem]">
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap items-center justify-center  w-auto pt-6 2xl:pt-9">
            <EditUserProfile props={profile} />
          </div>
          <RightSidebar confetti={false} user={user} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient(initialState, Context);

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
