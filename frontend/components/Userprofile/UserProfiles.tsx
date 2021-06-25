import React from 'react';
import Link from 'next/link';

export const UserProfiles = ({ props }): JSX.Element => {
  const data = props;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {/* Userprofile Card */}
        {data
          .slice(0)
          .reverse()
          .map(
            (profile: {
              id: string;
              color: string;
              user: { username: string };
              description: string;
              favoriteAnime: string;
              favoriteManga: string;
              favoriteChar: string;
            }) => (
              <div key={profile.id}>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex rounded-lg bg-indigo-900">
                    <div
                      className="flex flex-col items-start rounded-lg h-[290px] w-[335px] p-6"
                      style={{
                        background: `linear-gradient(270deg, ${profile.color} -10%, rgba(67, 56, 202, 0) 100%)`,
                      }}
                    >
                      <div className="container flex items-center justify-between max-w-full mb-6">
                        <div className="flex flex-col">
                          <h1 className="text-xl font-bold italic text-gray-50 mb-1">
                            {profile.user.username}
                          </h1>
                          <p
                            className="text-xs font-light italic text-gray-50"
                            style={{ maxWidth: '11.5rem' }}
                          >
                            {profile.description}
                          </p>
                        </div>
                        <div
                          className="rounded-full bg-gray-200 h-20 w-20"
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
                          {profile.favoriteAnime ? (
                            <>
                              {' '}
                              <p className="text-xs font-bold italic text-gray-50 mb-1">
                                favorite Anime
                              </p>
                              <p className="text-xs font-light italic text-gray-50 mb-3">
                                {profile.favoriteAnime}
                              </p>{' '}
                            </>
                          ) : null}

                          {profile.favoriteManga ? (
                            <>
                              {' '}
                              <p className="text-xs font-bold italic text-gray-50 mb-1">
                                favorite Manga
                              </p>
                              <p className="text-xs font-light italic text-gray-50 mb-3">
                                {profile.favoriteManga}
                              </p>{' '}
                            </>
                          ) : null}

                          {profile.favoriteChar ? (
                            <>
                              {' '}
                              <p className="text-xs font-bold italic text-gray-50 mb-1">
                                favorite Character
                              </p>
                              <p className="text-xs font-light italic text-gray-50 mb-3">
                                {profile.favoriteChar}
                              </p>
                            </>
                          ) : null}
                        </div>
                        <div className="flex flex-col">
                          <div
                            className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-1"
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
                            ></div>
                            <h1 className="text-sm font-light italic text-gray-50">
                              {props.finished}
                            </h1>
                          </div>
                          <div
                            className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-1"
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
                              {props.watching}
                            </h1>
                          </div>
                          <div
                            className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-2"
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
                              {props.watchlist}
                            </h1>
                          </div>
                          <Link href={'profile/' + profile.id.toString()}>
                            <button
                              className="btn-sm text-black text-sm italic bg-gray-50 hover:bg-gray-700 hover:text-gray-50"
                              style={{
                                filter:
                                  'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                              }}
                            >
                              Visit Profile
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="z-[-1] rounded-lg h-[290px] w-[335px] ml-[-20.5rem] "
                    style={{
                      backgroundColor: `${profile.color}`,
                      filter: 'blur(20px)',
                    }}
                  />
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};
