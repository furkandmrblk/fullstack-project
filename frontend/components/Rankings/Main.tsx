import React from 'react';
import { AnimeRanking } from './parts/AnimeRanking';
import { CharacterRanking } from './parts/CharacterRanking';
import { MangaRanking } from './parts/MangaRanking';
import { RankingsWelcome } from './parts/RankingsWelcome';

export const Main = ({ favorites }) => {
  return (
    <div
      className="bg-customIndigo rounded-lg p-5 w-auto h-auto mt-[1.5rem] mb-3 2xl:mt-[1.65rem] 2xl:mb-3"
      style={{
        background:
          'linear-gradient(144deg, rgba(79,70,229,1) 28%, rgba(236,72,153,1) 100%)',
      }}
    >
      <RankingsWelcome />
      <div className="grid grid-cols-2 gap-9 2xl:gap-4">
        <AnimeRanking favorites={favorites} />
        <MangaRanking favorites={favorites} />
        <CharacterRanking favorites={favorites} />
      </div>
    </div>
  );
};
