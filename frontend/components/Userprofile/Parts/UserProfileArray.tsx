import React, { useEffect, useState } from 'react';
import {
  animeList,
  tempArrayFinished,
  tempArrayWatching,
  tempArrayWatchlist,
} from '../../../pages/api';

export const UserProfileArray = ({ props }) => {
  const [search, setSearch] = useState(false);
  const [error, setError] = useState('');

  const openSearch = (e: any) => {
    e.preventDefault();
    setSearch(!search);
  };

  const removeItem = (arr: string[], value?: string) => {
    let currentItem = arr.indexOf(value);
    if (currentItem > -1) {
      arr.splice(currentItem, 1);
    }

    return arr;
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center bg-gray-700 rounded-lg w-[19.5rem] h-[24rem] p-6 2xl:w-[22.5rem]">
        <div className="container flex justify-between max-w-full items-center mb-4">
          <input
            onClick={openSearch}
            className="text-base antialiased font-base text-white italic bg-gray-700 rounded-md outline-none w-[13.5rem] h-[2.25rem] px-4 2xl:w-[16.5rem]"
            style={{ border: `1px solid ${props.color}` }}
            placeholder="Search Anime.."
          />
          <div
            className="cursor-pointer"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '2.25rem',
              width: '2.25rem',
            }}
          />
        </div>
        {error ? (
          <>
            <p className="text-xs antialiased font-medium text-red-600 mb-4">
              {error}
            </p>
          </>
        ) : null}
        {search ? (
          <>
            {' '}
            <div
              className="absolute bg-gray-700 rounded-md outline-none mt-12 p-1"
              style={{ border: `1px solid ${props.color}` }}
            >
              <div className="flex flex-col justify-start items-start overflow-y-scroll scrollbar overflow-x-hidden text-sm antialiased font-base text-white italic w-[16rem] h-[15rem]">
                {animeList.map((anime, index) => (
                  <>
                    {props.version === 'finished' ? (
                      <>
                        {' '}
                        <p
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              tempArrayFinished.includes(anime) ||
                              tempArrayWatching.includes(anime) ||
                              tempArrayWatchlist.includes(anime)
                            ) {
                              setSearch(false);
                              setError(
                                'You already have this anime in your list.'
                              );
                            } else {
                              setError(null);
                              tempArrayFinished.push(anime);
                              setSearch(false);
                            }
                          }}
                          className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                        >
                          {anime}
                        </p>{' '}
                      </>
                    ) : null}
                    {props.version === 'watching' ? (
                      <>
                        {' '}
                        <p
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();

                            if (
                              tempArrayFinished.includes(anime) ||
                              tempArrayWatching.includes(anime) ||
                              tempArrayWatchlist.includes(anime)
                            ) {
                              setSearch(false);
                              setError(
                                'You already have this anime in your list.'
                              );
                            } else {
                              setError(null);
                              tempArrayWatching.push(anime);
                              setSearch(false);
                            }
                          }}
                          className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                        >
                          {anime}
                        </p>{' '}
                      </>
                    ) : null}
                    {props.version === 'watchlist' ? (
                      <>
                        {' '}
                        <p
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              tempArrayFinished.includes(anime) ||
                              tempArrayWatching.includes(anime) ||
                              tempArrayWatchlist.includes(anime)
                            ) {
                              setSearch(false);
                              setError(
                                'You already have this anime in your list.'
                              );
                            } else {
                              setError(null);
                              tempArrayWatchlist.push(anime);
                              setSearch(false);
                            }
                          }}
                          className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                        >
                          {anime}
                        </p>{' '}
                      </>
                    ) : null}
                  </>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className="scrollbar container h-full overflow-y-scroll pr-2">
          {props.version === 'finished' ? (
            <>
              {' '}
              {tempArrayFinished.map((item: string, index) => (
                <div
                  key={index}
                  onClick={() => removeItem(tempArrayFinished, item)}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-red-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] px-4 mb-1 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
          {props.version === 'watching' ? (
            <>
              {' '}
              {tempArrayWatching.map((item: string, index) => (
                <div
                  key={index}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-red-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] px-4 mb-1 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
          {props.version === 'watchlist' ? (
            <>
              {' '}
              {tempArrayWatchlist.map((item: string, index) => (
                <div
                  key={index}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-red-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] px-4 mb-1 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
