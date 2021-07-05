import React, { useEffect, useState } from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export const UserProfiles = ({ props, list }): JSX.Element => {
  const data = props;
  const listData = list;

  let allData = data.map((singleProfile) =>
    mergeListWithProfile(
      listData.find((list: any) => list.user.id === singleProfile.user.id),
      singleProfile
    )
  );

  function mergeListWithProfile(singleList, singleProfile) {
    const merged = { singleList, singleProfile };

    return merged;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 3xl:grid-cols-2 mb-4 3xl:gap-3">
        {/* Userprofile Card */}
        {allData
          .slice(0)
          .reverse()
          .map((profile) => (
            <div key={profile.singleProfile.id}>
              <div className="flex items-center justify-center">
                <div className="flex rounded-lg bg-indigo-900">
                  <div
                    className="flex flex-col items-start rounded-lg h-[290px] w-[335px] p-6 2xl:w-[270px] 2xl:h-[270px]"
                    style={{
                      background: `linear-gradient(270deg, ${profile.singleProfile.color} -10%, rgba(67, 56, 202, 0) 100%)`,
                    }}
                  >
                    <div className="container flex items-center justify-between max-w-full mb-6">
                      <div className="flex flex-col">
                        <h1 className="text-xl font-bold italic text-gray-50 mb-1 2xl:text-sm">
                          {profile.singleProfile.user.username}
                        </h1>
                        <p className="text-xs font-light text-gray-50 max-w-[11.5rem] 2xl:max-w-[7rem]">
                          {profile.singleProfile.description}
                        </p>
                      </div>
                      <div
                        className="rounded-full bg-gray-200 h-20 w-20 2xl:h-16 2xl:w-16"
                        style={{
                          backgroundImage: `url('/kpop.jpeg')`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </div>
                    <div className="container flex items-start justify-between max-w-full">
                      <div className="flex flex-col">
                        {profile.singleProfile.favoriteAnime ? (
                          <>
                            {' '}
                            <p className="text-xs font-bold italic text-gray-50 mb-1">
                              favorite Anime
                            </p>
                            <p className="text-xs font-light italic text-gray-50 mb-3">
                              {profile.singleProfile.favoriteAnime}
                            </p>{' '}
                          </>
                        ) : null}

                        {profile.singleProfile.favoriteManga ? (
                          <>
                            {' '}
                            <p className="text-xs font-bold italic text-gray-50 mb-1">
                              favorite Manga
                            </p>
                            <p className="text-xs font-light italic text-gray-50 mb-3">
                              {profile.singleProfile.favoriteManga}
                            </p>{' '}
                          </>
                        ) : null}

                        {profile.singleProfile.favoriteChar ? (
                          <>
                            {' '}
                            <p className="text-xs font-bold italic text-gray-50 mb-1">
                              favorite Character
                            </p>
                            <p className="text-xs font-light italic text-gray-50 mb-3">
                              {profile.singleProfile.favoriteChar}
                            </p>
                          </>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-end">
                        <div
                          className="flex items-center justify-between bg-gray-700 hover:bg-gray-800/80 transition duration-500 ease-in-out rounded-lg w-28 p-[0.35rem] mb-1 2xl:w-16"
                          style={{
                            filter:
                              'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                          }}
                        >
                          <div
                            style={{
                              backgroundImage: `url('./Finished.svg')`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              height: '1.25rem',
                              width: '1.25rem',
                            }}
                          />
                          <h1 className="text-sm font-light italic text-gray-50">
                            {profile.singleList.finishedAnimes.length}
                          </h1>
                        </div>
                        <div
                          className="flex items-center justify-between bg-gray-700 hover:bg-gray-800/80 transition duration-500 ease-in-out  rounded-lg w-28 p-[0.35rem] mb-1 2xl:w-16"
                          style={{
                            filter:
                              'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                          }}
                        >
                          <div
                            style={{
                              backgroundImage: `url('./Watching.svg')`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              height: '1.25rem',
                              width: '1.25rem',
                            }}
                          ></div>
                          <h1 className="text-sm font-light italic text-gray-50">
                            {profile.singleList.watchingAnimes.length}
                          </h1>
                        </div>
                        <div
                          className="flex items-center justify-between bg-gray-700 hover:bg-gray-800/80 transition duration-500 ease-in-out  rounded-lg w-28 p-[0.35rem] mb-2 2xl:w-16"
                          style={{
                            filter:
                              'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                          }}
                        >
                          <div
                            style={{
                              backgroundImage: `url('./Watchlist.svg')`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              height: '1.25rem',
                              width: '1.25rem',
                            }}
                          ></div>
                          <h1 className="text-sm font-light italic text-gray-50">
                            {profile.singleList.watchlistAnimes.length}
                          </h1>
                        </div>

                        <Link
                          href={
                            'profile/' + profile.singleProfile.id.toString()
                          }
                        >
                          <button
                            className="btn-sm flex items-center justify-center text-black text-sm italic bg-gray-50 group hover:bg-gray-700 hover:text-gray-50 2xl:w-[2rem]"
                            style={{
                              filter:
                                'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                            }}
                          >
                            <ExternalLinkIcon className="2xl:block 2xl:h-5 2xl:w-5 2xl:text-gray-700 2xl:cursor-pointer 2xl:group-hover:text-white 2xl:transition 2xl:duration-300 2xl:ease-in-out hidden" />
                            <h1 className="w-[6.15rem] 2xl:hidden">
                              Visit Profile
                            </h1>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="z-[-1] rounded-lg h-[290px] w-[335px] ml-[-21rem] 2xl:w-[270px] 2xl:h-[270px] 2xl:ml-[-16.5rem] filter blur-[15px]"
                  style={{
                    backgroundColor: `${profile.singleProfile.color}`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
