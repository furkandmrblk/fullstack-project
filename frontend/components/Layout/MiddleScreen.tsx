import React from 'react';
import { Searchbar } from './Searchbar';
import { UserProfiles } from '../Userprofile/UserProfiles';

export const MiddleScreen = ({ props }): JSX.Element => {
  return (
    <>
      {/* Middle Screen */}
      <div className="flex flex-auto flex-col justify-start items-start pt-[1.6rem]">
        {/* Searchbar */}
        <div className="flex flex-wrap  w-[56vw] pl-3 pr-3">
          <Searchbar />

          {/* User Profiles */}

          <UserProfiles props={props} />
        </div>
      </div>
    </>
  );
};
