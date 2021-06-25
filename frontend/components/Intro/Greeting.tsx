import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { getProfilesQ } from '../../pages';
import { getCurrentUserQ } from '../Userprofile/CreateUserProfile';
import { GreetingContainer } from './GreetingContainer';
import { UserProfiles } from '../Userprofile/UserProfiles';

export const Greeting = () => {
  const [browse, setBrowse] = useState(false);

  const browseProfiles = () => {
    setBrowse(true);
  };

  const profiles = useQuery(getProfilesQ);

  if (profiles.loading) {
    return <p>Loading...</p>;
  }

  const user = useQuery(getCurrentUserQ);

  if (user.loading) {
    return <p>Loading...</p>;
  }

  const allProfiles = profiles.data.getUserProfiles;

  const data = user.data.getCurrentUser;

  return (
    <>
      <GreetingContainer data={data} browseProfiles={browseProfiles} />
     
      {browse ? <UserProfiles props={allProfiles} /> : null}
      
    </>
  );
};
