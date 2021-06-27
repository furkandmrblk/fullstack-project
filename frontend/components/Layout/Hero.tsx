import React, { useEffect, useState } from 'react';
import { MiddleScreen } from './MiddleScreen';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { Greeting } from '../Intro/Greeting';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { getCurrentUserQ } from '../../graphql/Queries';
import { useQuery } from '@apollo/client';

export const Hero = ({ props }): JSX.Element => {

  const profile = useQuery(getCurrentUserQ);

  if (profile.loading) {
    return <p>Loading...</p>
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
  if (props.error) {
    return <p>An error has occured. {props.error.message}</p>;
  }

  const data = props.data.getUserProfiles;

  return (
    <>
      <div
        className="container flex max-w-full justify-center items-start"
        style={{ height: '91vh', marginTop: '5.235rem' }}
      >
        {hasProfile ? (
          <>
            <LeftSidebar confetti={false} />
            <div className="flex flex-wrap  w-[56vw]">
              <MiddleScreen props={data} />
            </div>
            <RightSidebar confetti={false} />
          </>
        ) : (
          <>
            {' '}
            <LeftSidebar confetti={true} />
            <div className="flex justify-center flex-wrap  w-[56vw]">
              <Greeting />
            </div>
            <RightSidebar confetti={true} />
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
