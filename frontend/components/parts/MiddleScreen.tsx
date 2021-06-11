import React from 'react';
import { Searchbar } from './Searchbar';
import { UserProfiles } from './UserProfiles';

export const MiddleScreen = ({ props }): JSX.Element => {
  return (
    <>
      {/* Middle Screen */}
      <div
        className="flex flex-auto flex-col justify-start items-start pt-8 pb-8 pr-[7.1rem] pl-[7.1rem]"
        style={{ minHeight: '91.5vh', margin: '8.5vh 24rem 0 24rem' }}
      >
        {/* Searchbar */}
        <div className="flex w-full items-center">
          <Searchbar />
        </div>

        {/* User Profiles */}
        <UserProfiles props={props} />
      </div>
    </>
  );
};
