import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
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

  return (
    <>
      <div className="flex flex-col justify-start items-center bg-gray-700 rounded-lg w-[19.5rem] min-h-[21rem] p-6">
        <div className="container flex justify-between max-w-full items-center mb-4">
          <input
            onClick={openSearch}
            className="text-base antialiased font-base text-white italic bg-gray-700 rounded-md outline-none w-[13.5rem] h-[2.25rem] px-4"
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
              className="absolute flex flex-col justify-start items-start overflow-y-scroll overflow-x-hidden text-sm antialiased font-base text-white italic bg-gray-700 rounded-bl-md rounded-tl-md outline-none w-[16.5rem] h-[15rem] py-1 px-1 mt-12"
              style={{ border: `1px solid ${props.color}` }}
            >
              {animeList.map((anime, index) => (
                <>
                  {props.version === 'finished' ? (
                    <>
                      {' '}
                      <p
                        key={index}
                        id={index.toString()}
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
                        className="mt-1 py-[0.15rem] px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
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
                        id={index.toString()}
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
                        className="mt-1 py-[0.15rem] px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
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
                        id={index.toString()}
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
                        className="mt-1 py-[0.15rem] px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                      >
                        {anime}
                      </p>{' '}
                    </>
                  ) : null}
                </>
              ))}
            </div>{' '}
          </>
        ) : null}

        {props.version === 'finished' ? (
          <>
            {' '}
            {tempArrayFinished.map((item: string, index) => (
              <div
                key={index}
                className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 border-[1px] border-gray-600 rounded-md outline-none max-w-full h-[2.25rem] px-4 mb-1"
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
                className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 border-[1px] border-gray-600 rounded-md outline-none max-w-full h-[2.25rem] px-4 mb-1"
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
                className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 border-[1px] border-gray-600 rounded-md outline-none max-w-full h-[2.25rem] px-4 mb-1"
              >
                {item}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};
