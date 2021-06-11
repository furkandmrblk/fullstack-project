import React from 'react';

export const UserProfile = ({ props }) => {
  const data = props;

  if (!data) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div
      className="flex flex-auto flex-col justify-start items-start pt-16 pb-16 pr-[7.1rem] pl-[7.1rem]"
      style={{
        minHeight: '91.5vh',
        margin: '8.5vh 24rem 0 24rem',
        background: `linear-gradient(180deg, ${data.color} -130%, rgba(247, 237, 238, 0) 100%)`,
      }}
    >
      {/* Username, Description & Profile Picture */}
      <div className="flex justify-between items-center w-[100%] mb-20">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-7xl antialiased font-medium text-white">
            {data.user.username}
          </h1>
          <p className="text-base antialiased font-light text-white max-w-3xl">
            {data.description}
          </p>
        </div>
        <div className="rounded-full bg-gray-200 h-52 w-52" />
      </div>
      {/* Favorite Anime, Manga & Character */}
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-base antialiased font-medium text-white mb-2">
          Favorite Anime
        </h1>
        <p className="text-base antialiased font-light text-white">
          {data.favoriteAnime}
        </p>
        <h1 className="text-base antialiased font-medium text-white mt-2 mb-2">
          Favorite Manga
        </h1>
        <p className="text-base antialiased font-light text-white">
          {data.favoriteManga}
        </p>
        <h1 className="text-base antialiased font-medium text-white mt-2 mb-2">
          Favorite Character
        </h1>
        <p className="text-base antialiased font-light text-white">
          {data.favoriteChar}
        </p>
      </div>
      {/* Category */}

      {/* Watchlist */}
    </div>
  );
};
