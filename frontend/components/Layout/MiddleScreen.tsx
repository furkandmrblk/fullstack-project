import React from 'react';
import { Searchbar } from './Searchbar';
import { UserProfiles } from '../Userprofile/UserProfiles';

export const MiddleScreen = ({ props, list }): JSX.Element => {
  return (
    <>
      {/* Middle Screen */}
      <div className="flex flex-auto flex-col justify-center items-center pt-[1.6rem]">
        {/* Searchbar */}
        <div className="w-full pl-3 pr-3">
          <Searchbar />
        </div>
        <div className="flex flex-wrap items-center justify-center w-auto pl-3 pr-3">
          {/* User Profiles */}

          <UserProfiles props={props} list={list} />
        </div>
      </div>
    </>
  );
};
