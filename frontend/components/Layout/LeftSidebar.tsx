import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { getListsQ, getProfilesQ } from '../../graphql/Queries';
import { partition, quickSort, topPickedAnimes } from '../../pages/api';

export const LeftSidebar = ({ confetti }): JSX.Element => {
  return (
    <div className="z-50 fixed left-0 bottom-0 flex flex-none flex-col justify-between items-center bg-indigo-700/50 rounded-lg overflow-hidden p-4 h-[87vh] w-[24.5rem] 2xl:mb-3 2xl:ml-3 lg:hidden mb-4 ml-4">
      {confetti ? (
        <div
          className="w-[500px] h-[900px]"
          style={{
            backgroundImage: `url('./Confetti.svg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : null}
    </div>
  );
};
