import React from 'react';

export const AnimeChart = (props) => {
  const data = props.props;

  return (
    <div className="flex flex-col justify-start items-center p-5 bg-indigo-800/80 w-[22rem] h-96 rounded-lg">
      <h1 className="text-base antialiased font-bold text-white mb-4">
        Top Favorite Animes
      </h1>
      {data.map((anime, index) => (
        <div key={index}>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base antialiased font-bold text-white">
              {index + 1}
            </p>
            <div className="flex justify-between items center w-56">
              <p className="text-base antialiased font-medium text-white">
                {anime.name}
              </p>
              <p className="text-base antialiased font-medium text-white">
                {anime.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
