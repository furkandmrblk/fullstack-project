import React, { useEffect, useState } from 'react';
import { MiddleScreen } from './MiddleScreen';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { Greeting } from '../Intro/Greeting';

export const Hero = ({ props, profile }): JSX.Element => {
  if (props.loading) {
    return <p>Loading...</p>;
  }
  if (props.error) {
    return <p>An error has occured. {props.error.message}</p>;
  }

  const confetti = {
    confetti: true,
  };


  const [hasProfile, setProfile] = useState(undefined);

  useEffect(() => {
    let profileData = profile.data.getCurrentUser.userprofile;
    
    if (profileData !== null) {
      setProfile(true);
    } else {
      setProfile(false);
    }
  }, []);

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
            <LeftSidebar confetti={confetti} />
            <div className="flex justify-center flex-wrap  w-[56vw]">
              <Greeting />
            </div>
            <RightSidebar confetti={confetti} />
          </>
        )}
      </div>
    </>
  );
};
