import React from 'react';

export const CharChart = () => {
  return (
    <div className="flex flex-col justify-start items-center p-5 bg-indigo-800/60 w-[22rem] h-96 rounded-lg">
      <h1 className="text-base antialiased font-bold text-white mb-4">
        Top Favorite Chars
      </h1>
      <div className="flex justify-between items-center w-72 mb-2">
        <p className="text-base antialiased font-light text-white">01</p>
        <p className="text-base antialiased font-light text-white">
          Gojo Satoru
        </p>
        <p className="text-base antialiased font-light text-white">70.438</p>
      </div>
    </div>
  );
};
