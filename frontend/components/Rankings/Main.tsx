import React from 'react';
import { AnimeRanking } from './parts/AnimeRanking';
import { CharacterRanking } from './parts/CharacterRanking';
import { MangaRanking } from './parts/MangaRanking';
import { RankingsWelcome } from './parts/RankingsWelcome';

export const Main = ({ favorites }) => {
  return (
    <div className="bg-customIndigo rounded-lg p-5 h-auto mt-[1.5rem]">
      <RankingsWelcome />
      <div className="grid grid-cols-2 gap-9 2xl:gap-4">
        <AnimeRanking favorites={favorites} />
        <MangaRanking favorites={favorites} />
        <CharacterRanking favorites={favorites} />
      </div>
    </div>
  );
};
