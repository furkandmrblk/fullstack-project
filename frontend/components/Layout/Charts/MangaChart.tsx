import React from 'react';

export const MangaChart = () => {
  return (
    <div className="flex flex-col justify-start items-center p-5 bg-gray-600 w-80 h-96 rounded-lg ">
      <h1 className="text-base antialiased font-medium text-white mb-4">
        Top Favorite Mangas
      </h1>
      <div className="flex justify-between items-center w-72 mb-2">
        <p className="text-base antialiased font-light text-white">01</p>
        <p className="text-base antialiased font-light text-white">
          Jujutsu Kaisen
        </p>
        <p className="text-base antialiased font-light text-white">63.765</p>
      </div>
    </div>
  );
};
