import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { ChromePicker } from 'react-color';
import { addListM } from '../../graphql/Mutations';
import { UserProfileArray } from './Parts/UserProfileArray';
import {
  getAnime,
  getChar,
  getManga,
  tempArrayFinished,
  tempArrayWatching,
  tempArrayWatchlist,
} from '../../pages/api';
import { getCurrentListQ } from '../../graphql/Queries';
import { InputField } from './Parts/InputField';

export const EditUserProfile = ({ props }) => {
  const router = useRouter();

  const profile = props;

  const [data, setData] = useState({
    description: props?.description,
  });

  const { description } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [pickColor, setPickedColor] = useState({ color: profile.color });

  const { color } = pickColor;

  const handleColorChange = (color) => {
    setPickedColor({ color: color.hex });
  };

  const [error, setError] = useState([]);

  const editSchema = z.object({
    description: z.string().max(80, {
      message: 'Description must be 80 or fewer characters long.',
    }),
  });

  const [updateProfile] = useMutation(updateProfileM, {
    variables: {
      description: description,
      color: color,
      favoriteChar: getChar(),
      favoriteAnime: getAnime(),
      favoriteManga: getManga(),
    },
  });

  const finishedMangas = [];
  const watchingMangas = [];
  const watchlistMangas = [];

  const a = {
    img: '/Finished.svg',
    color: '#10B981',
    version: 'finished',
  };

  const b = {
    img: '/Watching.svg',
    color: '#A78BFA',
    version: 'watching',
  };

  const c = {
    img: '/Watchlist.svg',
    color: '#FCD34D',
    version: 'watchlist',
  };

  const [addList] = useMutation(addListM, {
    variables: {
      finishedAnimes: tempArrayFinished,
      watchingAnimes: tempArrayWatching,
      watchlistAnimes: tempArrayWatchlist,

      finishedMangas: finishedMangas,
      watchingMangas: watchingMangas,
      watchlistMangas: watchlistMangas,
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      editSchema.parse(data);
      setError(null);

      await updateProfile({
        variables: {
          description: description,
          color: color,
          favoriteChar: getChar(),
          favoriteAnime: getAnime(),
          favoriteManga: getManga(),
        },
      });

      await addList({
        variables: {
          finishedAnimes: tempArrayFinished,
          watchingAnimes: tempArrayWatching,
          watchlistAnimes: tempArrayWatchlist,

          finishedMangas: finishedMangas,
          watchingMangas: watchingMangas,
          watchlistMangas: watchlistMangas,
        },
      });

      await router.push('/userprofile');
      location.reload();
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        let customError = err.flatten().fieldErrors;
        setError(customError.description);
      }
    }
  };

  const getList = useQuery(getCurrentListQ);

  if (getList.loading) {
    return <p>Loading...</p>;
  }

  const listData = getList.data.getCurrentList;

  if (
    !tempArrayFinished[0] &&
    !tempArrayWatching[0] &&
    !tempArrayWatchlist[0]
  ) {
    listData.finishedAnimes.map((item: string) => tempArrayFinished.push(item));

    listData.watchingAnimes.map((item: string) => tempArrayWatching.push(item));

    listData.watchlistAnimes.map((item: string) =>
      tempArrayWatchlist.push(item)
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-start bg-indigo-900 rounded-lg w-auto h-auto mb-4"
    >
      <div
        className="flex flex-col items-start rounded-lg w-auto h-auto pt-16 pb-16 pr-8 pl-8"
        style={{
          background: `linear-gradient(270deg, ${color} -10%, rgba(67, 56, 202, 0) 100%)`,
        }}
      >
        {/* Username, Description & Profile Picture */}
        <div className="container flex justify-between items-center max-w-full mb-6">
          <div className="flex flex-col items-start">
            <h1 className="text-6xl font-bold italic text-gray-50 mb-2">
              {profile.user.username}
            </h1>
            <label className="text-base font-light text-gray-50 mb-2">
              Description
            </label>
            <textarea
              onChange={onChange}
              name="description"
              className="text-sm antialiased font-base text-white italic bg-gray-700 outline-none w-80 h-20 rounded-lg resize-none p-2 mb-2"
              value={data.description}
            />
            {error ? (
              <p className="text-xs antialiased font-medium text-red-800 mt-2 mb-2">
                {error}
              </p>
            ) : null}
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

        <div className="container flex justify-between items-start max-w-full mb-6">
          <div className="flex flex-col">
            <label className="text-base antialiased font-medium text-white mb-2">
              Background-Color
            </label>
            <ChromePicker
              className="mb-8"
              disableAlpha
              color={color}
              onChangeComplete={handleColorChange}
            />

            <p className="text-base font-light text-gray-50 mb-2">
              favorite Anime
            </p>
            <InputField
              props={{
                version: 'anime',
                placeholder: `${props?.favoriteAnime || 'Search Anime...'}`,
              }}
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Manga
            </p>
            <InputField
              props={{
                version: 'manga',
                placeholder: `${props?.favoriteManga || 'Search Manga...'}`,
              }}
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Character
            </p>
            <InputField
              props={{
                version: 'character',
                placeholder: `${props?.favoriteChar || 'Search Character...'}`,
              }}
            />
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
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <UserProfileArray props={a} />
          <UserProfileArray props={b} />
          <UserProfileArray props={c} />
        </div>

        <button
          type="submit"
          className="fixed bottom-0 z-50 btn-lg text-white bg-green-600 hover:bg-green-700 w-30 mb-10 ml-[50rem]"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// User Mutation
export const updateProfileM = gql`
  mutation updateProfile(
    $description: String
    $color: String
    $favoriteChar: String
    $favoriteAnime: String
    $favoriteManga: String
  ) {
    updateProfile(
      profile: {
        description: $description
        color: $color
        favoriteChar: $favoriteChar
        favoriteAnime: $favoriteAnime
        favoriteManga: $favoriteManga
      }
    ) {
      user {
        username
      }
      description
      color
      favoriteChar
      favoriteAnime
      favoriteManga
    }
  }
`;
