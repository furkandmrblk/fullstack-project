import React from 'react';

export const AnimeChart = (props) => {
  const data = props.props;

  return (
    <div className="flex flex-col items-start justify-start w-full h-auto rounded-lg text-white bg-indigo-700/50 p-6 mb-4">
      <h1 className="text-base  font-bold text-white mb-4">
        Top Favorite Animes
      </h1>
      {data.map((anime, index) => (
        <div key={index}>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base  font-bold text-white">{index + 1}</p>
            <div className="flex justify-between items center w-56">
              <p className="text-base  font-medium text-white">{anime.name}</p>
              <p className="text-base  font-medium text-white">{anime.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
