import React from 'react';
import Image from 'next/image';
import RankingImage from '../../../public/rankingimage.jpeg';

export const RankingsWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-start text-white antialiased p-8 bg-indigo-800/25 rounded-lg w-[53.5vw] 2xl:w-[46.5vw] h-auto mb-8 2xl:mb-6">
      <h1 className="text-2xl font-semibold italic">
        Welcome to the{' '}
        <span className="p-2 ml-2 mr-2 bg-white text-black rounded-md">
          ani<span className="text-indigo-700">Spot</span>
        </span>{' '}
        rankings!
      </h1>
    </div>
  );
};
