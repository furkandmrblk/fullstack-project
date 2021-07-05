import React, { useEffect, useState } from 'react';
import { MiddleScreen } from './MiddleScreen';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { Greeting } from '../Intro/Greeting';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { getCurrentUserQ } from '../../graphql/Queries';
import { useQuery } from '@apollo/client';

export const Hero = ({ props, list }): JSX.Element => {
  const profile = useQuery(getCurrentUserQ);

  if (profile.loading) {
    return <p>Loading...</p>;
  }

  let hasProfile: boolean = undefined;

  if (profile.data.getCurrentUser.userprofile !== null) {
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

  return (
    <>
      <div
        className="container flex max-w-full justify-center items-start"
        style={{ height: '91vh', marginTop: '5.235rem' }}
      >
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
