import { useState } from 'react';
import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { EditUserProfile } from '../components/Userprofile/EditUserProfile';
import { useQuery } from '@apollo/client';
import { getCurrentListQ, getCurrentUserProfileQ } from '../graphql/Queries';
import { getStandaloneApolloClient } from '../client/standAloneClient';

export default function EditProfilePage() {
  const getProfile = useQuery(getCurrentUserProfileQ);

  if (getProfile.loading) {
    return <p>Loading...</p>;
  }

  const profile = getProfile.data.getCurrentUserProfile;

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />

        <div
          className="container flex max-w-full justify-center items-start"
          style={{ height: '91vh', marginTop: '5.235rem' }}
        >
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap  w-[56vw] pt-[1.6rem]">
            <EditUserProfile props={profile} />
          </div>
          <RightSidebar confetti={false} />
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
