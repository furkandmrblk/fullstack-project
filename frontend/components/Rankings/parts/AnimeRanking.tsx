import React from 'react';
import { partition, quickSort } from '../../../pages/api';

export const AnimeRanking = ({ favorites }) => {
  const aniCount: { name: string; count: number }[] = [];

  if (favorites.loading) {
    return <p>Loading...</p>;
  }

  const favAnime = favorites.data.getUserProfiles;

  let topAnime = [];

  favAnime.map((e) => {
    if (e.favoriteAnime !== null) {
      topAnime.push(e.favoriteAnime);
    }
  });

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

  partition(aniCount);
  quickSort(aniCount);

  let sortedAniCount: { name: string; count: number }[] = aniCount.sort(
    ({ count: a }, { count: b }) => b - a
  );

  const size: number = 10;
  let sortedAniCountTop10: { name: string; count: number }[] =
    sortedAniCount.slice(0, size);

  return (
    <div className="flex flex-col items-start justify-start text-white antialiased pt-8 pr-8 pl-8 pb-4 bg-indigo-800/25 rounded-lg w-[31rem] min-h-[35.5rem] h-auto 2xl:w-[23.5rem] 2xl:text-sm 2xl:min-h-[31.5rem] 2xl:pt-6 2xl:pr-6 2xl:pl-6">
      <h1 className="font-bold mb-4 select-none">Top Favorite Animes</h1>
      {sortedAniCountTop10.map((anime, index) => (
        <>
          <div
            key={index}
            className="flex items-center justify-between bg-indigo-400/40 rounded-lg w-full p-2 mb-2 hover:bg-indigo-400/20 transition duration-500 ease-in-out select-none"
          >
            <div className="flex items-center">
              <h1 className="font-bold mr-4">{index + 1}</h1>
              <h1>{anime.name}</h1>
            </div>
            <h1>{anime.count}</h1>
          </div>
        </>
      ))}
    </div>
  );
};
