import React, { useState } from 'react';
import {
  animeList,
  tempArrayFinished,
  tempArrayWatching,
  tempArrayWatchlist,
} from '../../../pages/api';

export const UserProfileList = ({ props, data }) => {
  console.log(data);

  return (
    <>
      <div className="flex flex-col justify-start items-center bg-gray-700 rounded-lg w-[19.5rem] min-h-[21rem] p-6">
        <div className="container flex justify-between max-w-full items-center mb-4">
          <div
            className="flex justify-start items-center text-base antialiased font-base bg-gray-700 rounded-md outline-none w-[13.5rem] h-[2.25rem] px-4"
            style={{
              border: `1px solid ${props.color}`,
              color: `${props.color}`,
            }}
          >
            <h1>{props.name}</h1>
          </div>
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

        {props.version === 'finished' ? (
          <>
            {' '}
            {data.finishedAnimes.map((item: string, index) => (
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
            {data.watchingAnimes.map((item: string, index) => (
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
            {data.watchlistAnimes.map((item: string, index) => (
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
