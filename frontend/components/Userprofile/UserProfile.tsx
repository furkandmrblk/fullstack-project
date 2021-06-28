import { useQuery } from '@apollo/client';
import React from 'react';
import { getCurrentListQ } from '../../graphql/Queries';
import {
  tempArrayFinished,
  tempArrayWatching,
  tempArrayWatchlist,
} from '../../pages/api';
import { UserProfileList } from './Parts/UserProfileList';

export const UserProfile = ({ props, list }) => {
  const data = props;

  if (!data) {
    return <p className="text-white">Loading...</p>;
  }

  const listData = list;

  const a = {
    img: '/Finished.svg',
    color: '#10B981',
    version: 'finished',
    name: 'Finished',
  };

  const b = {
    img: '/Watching.svg',
    color: '#A78BFA',
    version: 'watching',
    name: 'Watching',
  };

  const c = {
    img: '/Watchlist.svg',
    color: '#FCD34D',
    version: 'watchlist',
    name: 'Watchlist',
  };

  return (
    <>
      <div className="flex justify-center items-center bg-indigo-900 rounded-lg w-[56vw] h-auto mb-4">
        <div
          className="flex flex-col items-start rounded-lg w-[56vw] h-auto p-16"
          style={{
            background: `linear-gradient(270deg, ${data.color} -10%, rgba(67, 56, 202, 0) 100%)`,
          }}
        >
          <div className="container flex justify-between items-center max-w-full mb-10">
            <div className="flex flex-col items-start">
              <h1 className="text-6xl font-bold text-gray-50 mb-2">
                {data.user.username}
              </h1>
              <p className="text-lg font-extralight text-gray-50">
                {data.description}
              </p>
            </div>
            <div
              className="rounded-full bg-gray-200 h-48 w-48"
              style={{
                backgroundImage: `url('/kpop.jpeg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          <div className="container flex justify-between items-start max-w-full mb-10">
            <div className="flex flex-col">
              {data.favoriteAnime ? (
                <>
                  <p className="text-lg font-bold italic text-gray-50 mb-1">
                    favorite Anime
                  </p>
                  <p className="text-base font-light italic text-gray-50 mb-5">
                    {data.favoriteAnime}
                  </p>{' '}
                </>
              ) : null}
              {data.favoriteManga ? (
                <>
                  {' '}
                  <p className="text-lg font-bold italic text-gray-50 mb-1">
                    favorite Manga
                  </p>
                  <p className="text-base font-light italic text-gray-50 mb-5">
                    {data.favoriteManga}
                  </p>{' '}
                </>
              ) : null}
              {data.favoriteChar ? (
                <>
                  {' '}
                  <p className="text-lg font-bold italic text-gray-50 mb-1">
                    favorite Character
                  </p>
                  <p className="text-base font-light italic text-gray-50">
                    {data.favoriteChar}
                  </p>{' '}
                </>
              ) : null}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center w-48">
                <div
                  className="bg-gray-700 h-10 w-10 rounded-lg mb-3 hover:bg-gray-800 transition duration-500 ease-in-out cursor-pointer"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                />
                <div
                  className="bg-gray-700 h-10 w-10 rounded-lg mb-3 hover:bg-gray-800 transition duration-500 ease-in-out cursor-pointer"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                />
                <div
                  className="bg-gray-700 h-10 w-10 rounded-lg mb-3 hover:bg-gray-800 transition duration-500 ease-in-out cursor-pointer"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                />
                <div
                  className="bg-gray-700 h-10 w-10 rounded-lg mb-3 hover:bg-gray-800 transition duration-500 ease-in-out cursor-pointer"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                />
              </div>
              <div
                className="flex items-center justify-between bg-gray-700 rounded-lg w-48 p-[0.55rem] mb-1"
                style={{
                  filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                }}
              >
                <div
                  style={{
                    backgroundImage: `url('/Finished.svg')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '2rem',
                    width: '2rem',
                  }}
                />
                <h1 className="text-sm font-light italic text-gray-50">
                  {listData.finishedAnimes.length}
                </h1>
              </div>
              <div
                className="flex items-center justify-between bg-gray-700 rounded-lg w-48 p-[0.55rem] mb-1"
                style={{
                  filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                }}
              >
                <div
                  style={{
                    backgroundImage: `url('/Watching.svg')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '2rem',
                    width: '2rem',
                  }}
                />
                <h1 className="text-sm font-light italic text-gray-50">
                  {listData.watchingAnimes.length}
                </h1>
              </div>
              <div
                className="flex items-center justify-between bg-gray-700 rounded-lg w-48 p-[0.55rem]"
                style={{
                  filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                }}
              >
                <div
                  style={{
                    backgroundImage: `url('/Watchlist.svg')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '2rem',
                    width: '2rem',
                  }}
                />
                <h1 className="text-sm font-light italic text-gray-50">
                  {listData.watchlistAnimes.length}
                </h1>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <UserProfileList props={a} data={listData} />
            <UserProfileList props={b} data={listData} />
            <UserProfileList props={c} data={listData} />
          </div>
        </div>
      </div>
    </>
  );
};
