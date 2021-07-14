import React, { useEffect, useState } from 'react';
import { MiddleScreen } from './MiddleScreen';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { Greeting } from '../Intro/Greeting';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { getCurrentUserQ } from '../../graphql/Queries';
import Link from 'next/link';

export const Hero = ({ props, list, profile }): JSX.Element => {
  if (profile.loading) {
    return <p>Loading...</p>;
  }

  let hasProfile: boolean = undefined;

  if (profile.data && profile.data.getCurrentUser.userprofile !== null) {
    hasProfile = true;
  } else {
    hasProfile = false;
  }

  if (props.loading) {
    return <p>Loading...</p>;
  }
  if (list.loading) {
    return <p>Loading...</p>;
  }

  if (props.error) {
    return <p>An error has occured. {props.error.message}</p>;
  }

  if (list.error) {
    return <p>An error has occured. {list.error.message}</p>;
  }

  const profiles = props.data.getUserProfiles;
  const user = profile.data.getCurrentUser;
  const lists = list.data.getLists;

  const isAdmin: boolean = profile.data.getCurrentUser.isAdmin;

  return (
    <>
      <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem] 2xl:mt-[4.55rem]">
        {hasProfile ? (
          <>
            <LeftSidebar confetti={false} />
            <div className="flex flex-wrap w-auto">
              <MiddleScreen props={profiles} list={lists} />
            </div>
            <RightSidebar confetti={false} user={user} />
          </>
        ) : (
          <>
            {' '}
            <LeftSidebar confetti={true} />
            <div className="flex flex-col justify-center items-center  w-auto">
              <Greeting list={lists} />
            </div>
            <RightSidebar confetti={true} user={user} />
          </>
        )}
      </div>
      {isAdmin === true ? (
        <Link href="/admindashboard">
          <button className="z-[1000] fixed bottom-0 right-0 mb-4 mr-[27.5rem] btn-lg bg-gray-800 text-white hover:bg-black">
            Dashboard
          </button>
        </Link>
      ) : null}
    </>
  );
};

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
