import React from 'react';
import Link from 'next/link';

export const UserProfiles = ({ props }): JSX.Element => {
  const data = props;

  return (
    <>
      <div className="flex flex-wrap items-center">
        {/* Userprofile Card */}
        {data.map(
          (profile: {
            id: React.Key;
            color: string;
            user: { username: string };
            description: string;
            favoriteAnime: string;
            favoriteManga: string;
            favoriteChar: string;
          }) => (
            <div className="flex" key={profile.id}>
              <div
                className="flex flex-col justify-start items-center p-5 rounded-lg h-64 w-72 mr-5 mb-5"
                style={{
                  background: `linear-gradient(180deg, ${profile.color} -20%, rgba(247, 237, 238, 0) 100%)`,
                }}
              >
                <div className="flex flex-col justify-start items-center w-full">
                  <div className="flex justify-between items-center w-full mb-5">
                    <div className="flex flex-col items-start">
                      <h1 className="text-base antialiased font-medium text-black">
                        {profile.user.username}
                      </h1>
                      <p
                        className="text-xs antialiased font-light text-black"
                        style={{ maxWidth: '9rem', textAlign: 'justify' }}
                      >
                        {profile.description}
                      </p>
                    </div>
                    <div
                      className="rounded-full bg-gray-200 h-20 w-20"
                      style={{
                        backgroundImage: `url('/izana.png')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col items-start">
                      <h1 className="text-xs antialiased font-medium text-black">
                        Favorite Anime
                      </h1>
                      <p className="text-xs antialiased font-light text-black">
                        {profile.favoriteAnime}
                      </p>
                      <h1 className="text-xs antialiased font-medium text-black">
                        Favorite Manga
                      </h1>
                      <p className="text-xs antialiased font-light text-black">
                        {profile.favoriteManga}
                      </p>
                      <h1 className="text-xs antialiased font-medium text-black">
                        Favorite Character
                      </h1>
                      <p className="text-xs antialiased font-light text-black">
                        {profile.favoriteChar}
                      </p>
                    </div>
                    <Link href={'profile/' + profile.id.toString()}>
                      <button className="btn-sm text-white bg-gray-800 hover:bg-gray-900">
                        Visit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
