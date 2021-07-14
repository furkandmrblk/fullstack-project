import React from 'react';
import { partition, quickSort } from '../../../pages/api';

export const CharacterRanking = ({ favorites }) => {
  const charCount: { name: string; count: number }[] = [];

  if (favorites.loading) {
    return <p>Loading...</p>;
  }

  const favChar = favorites.data.getUserProfiles;

  let topChar = [];

  favChar.map((e) => {
    if (e.favoriteChar !== null) {
      topChar.push(e.favoriteChar);
    }
  });

  const topChars = () => {
    topChar.sort();

    let current = null;
    let count = 0;

    for (let i = 0; i < topChar.length; i++) {
      if (topChar[i] != current) {
        if (count > 0) {
          charCount.push({ name: current, count: count });
        }
        current = topChar[i];
        count = 1;
      } else {
        count++;
      }
    }
    if (count > 0) {
      charCount.push({ name: current, count: count });
    }
  };

  topChars();

  partition(charCount);
  quickSort(charCount);

  let sortedCharCount: { name: string; count: number }[] = charCount.sort(
    ({ count: a }, { count: b }) => b - a
  );

  const size: number = 10;
  let sortedCharCountTop10: { name: string; count: number }[] =
    sortedCharCount.slice(0, size);

  return (
    <div className="flex flex-col items-start justify-start text-white antialiased pt-8 pr-8 pl-8 pb-4 bg-indigo-800/25 rounded-lg w-[31rem] min-h-[35.5rem] h-auto 2xl:w-[23.5rem]">
      <h1 className="font-bold mb-4">Top Favorite Characters</h1>
      {sortedCharCountTop10.map((character, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-indigo-400/40 rounded-lg w-full p-2 mb-2"
        >
          <div className="flex items-center">
            <h1 className="font-bold mr-4">{index + 1}</h1>
            <h1>{character.name}</h1>
          </div>
          <h1>{character.count}</h1>
        </div>
      ))}
    </div>
  );
};
