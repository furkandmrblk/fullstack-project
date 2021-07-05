import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { getListsQ, getProfilesQ } from '../../graphql/Queries';
import { partition, quickSort, topPickedAnimes } from '../../pages/api';
import { AnimeChart } from './Charts/AnimeChart';

export const LeftSidebar = ({ confetti }): JSX.Element => {
  const allFavs = useQuery(getProfilesQ);
  const aniCount = [];

  if (allFavs.loading) {
    return <p>Loading...</p>;
  }

  const favAnime = allFavs.data.getUserProfiles;

  let topAnime = [];

  favAnime.map((e) => topAnime.push(e.favoriteAnime));

  const topAnimes = () => {
    topAnime.sort();

    let current = null;
    let count = 0;

    for (let i = 0; i < topAnime.length; i++) {
      if (topAnime[i] != current) {
        if (count > 0) {
          aniCount.push({ name: current, count: count });
        }
        current = topAnime[i];
        count = 1;
      } else {
        count++;
      }
    }
    if (count > 0) {
      aniCount.push({ name: current, count: count });
    }
  };

  topAnimes();

  // partition();
  // quickSort();
  console.log(aniCount);

  return (
    <div className="z-50 fixed left-0 bottom-0 flex flex-none flex-col justify-between items-center bg-indigo-700/50 rounded-lg overflow-hidden p-4 h-[87vh] w-[24.5rem] 2xl:w-[18.5rem] 2xl:ml-3 xl:w-[17.5rem] lg:hidden mb-4 ml-4">
      {
        confetti ? (
          <div
            className="w-[500px] h-[900px]"
            style={{
              backgroundImage: `url('./Confetti.svg')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ) : null // <AnimeChart props={aniCount} />
      }
    </div>
  );
};
