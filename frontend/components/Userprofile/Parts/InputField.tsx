import React, { useState } from 'react';
import {
  animeList,
  charList,
  getAnime,
  getChar,
  getManga,
  mangaList,
  setAnime,
  setChar,
  setManga,
} from '../../../pages/api';

export const InputField = ({ props }) => {
  const [search, setSearch] = useState(false);

  const openSearch = (e: any) => {
    e.preventDefault();
    setSearch(!search);
  };

  return (
    <div>
      <div className="container flex justify-between max-w-full items-center mb-4">
        {props.version === 'anime' ? (
          <>
            <input
              onClick={openSearch}
              className="text-sm antialiased font-base text-white bg-gray-700 rounded-md outline-none placeholder-white cursor-pointer w-[16.5rem] h-[2.25rem] px-4"
              placeholder={props.placeholder}
              value={getAnime()}
            />{' '}
          </>
        ) : null}

        {props.version === 'manga' ? (
          <>
            <input
              onClick={openSearch}
              className="text-sm antialiased font-base text-white bg-gray-700 rounded-md outline-none placeholder-white cursor-pointer w-[16.5rem] h-[2.25rem] px-4"
              placeholder={props.placeholder}
              value={getManga()}
            />{' '}
          </>
        ) : null}

        {props.version === 'character' ? (
          <>
            <input
              onClick={openSearch}
              className="text-sm antialiased font-base text-white bg-gray-700 rounded-md outline-none placeholder-white cursor-pointer w-[16.5rem] h-[2.25rem] px-4"
              placeholder={props.placeholder}
              value={getChar()}
            />{' '}
          </>
        ) : null}
      </div>

      {search ? (
        <>
          {' '}
          <div className="absolute bg-gray-700 rounded-md outline-none p-1 mt-[-0.75rem]">
            <div className="flex flex-col justify-start items-start overflow-y-scroll scrollbar overflow-x-hidden text-sm antialiased font-base text-white italic w-[16rem] h-[15rem]">
              {props.version === 'anime' ? (
                <>
                  {animeList.map((anime, index) => (
                    <p
                      key={index}
                      id={index.toString()}
                      onClick={(e) => {
                        e.preventDefault();

                        setAnime(anime);
                        setSearch(false);
                      }}
                      className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                    >
                      {anime}
                    </p>
                  ))}
                </>
              ) : null}
              {props.version === 'manga' ? (
                <>
                  {mangaList.map((manga, index) => (
                    <p
                      key={index}
                      id={index.toString()}
                      onClick={(e) => {
                        e.preventDefault();

                        setManga(manga);
                        setSearch(false);
                      }}
                      className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                    >
                      {manga}
                    </p>
                  ))}
                </>
              ) : null}
              {props.version === 'character' ? (
                <>
                  {charList.map((char, index) => (
                    <p
                      key={index}
                      id={index.toString()}
                      onClick={(e) => {
                        e.preventDefault();

                        setChar(char);
                        setSearch(false);
                      }}
                      className="mt-1 py-[0.15rem] w-full px-4 rounded-md hover:bg-gray-600 transition duration-500 ease-in-out cursor-pointer"
                    >
                      {char}
                    </p>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
