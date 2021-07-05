import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { z } from 'zod';
import { ChromePicker } from 'react-color';
import { getCurrentListQ, getCurrentUserQ } from '../../graphql/Queries';
import { addListM, createProfileM } from '../../graphql/Mutations';
import { UserProfileArray } from './Parts/UserProfileArray';
import {
  getAnime,
  getChar,
  getManga,
  tempArrayFinished,
  tempArrayWatching,
  tempArrayWatchlist,
} from '../../pages/api';
import { InputField } from './Parts/InputField';

export const CreateUserProfile = () => {
  const router = useRouter();

  const [data, setData] = useState({
    description: '',
  });

  const { description } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [pickColor, setPickedColor] = useState({ color: '' });

  const { color } = pickColor;

  const handleColorChange = (color) => {
    setPickedColor({ color: color.hex });
  };

  const [error, setError] = useState([]);
  const [error2, setError2] = useState([]);

  const profileSchema = z.object({
    description: z
      .string()
      .min(1, { message: 'Please fill in the description field.' })
      .max(155, {
        message: 'Description must be 155 or fewer characters long.',
      }),
  });

  const colorSchema = z.object({
    color: z.string().min(1, { message: 'Please choose a color.' }),
  });

  const [createProfile, profileResult] = useMutation(createProfileM, {
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
      profileSchema.parse(data);
      colorSchema.parse(pickColor);

      setError(null);
      setError2(null);

      await createProfile({
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
        if (customError.description && customError.color) {
          setError(customError.description);
          setError2(customError.color);
        } else if (customError.description) {
          setError(customError.description);
          setError2(null);
        } else if (customError.color) {
          setError2(customError.color);
          setError(null);
        }
      }
    }
  };

  const currentUser = useQuery(getCurrentUserQ);

  if (currentUser.loading) {
    return <p className="text-white">Loading...</p>;
  }

  const userInfo = currentUser.data.getCurrentUser;

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center bg-indigo-900 rounded-lg w-auto h-auto mb-4"
    >
      <div
        className="flex flex-col items-start rounded-lg w-auto h-auto pt-16 pb-16 pr-8 pl-8"
        style={{
          background: `linear-gradient(270deg, ${color} -10%, rgba(67, 56, 202, 0) 100%)`,
        }}
      >
        {/* Username, Description & Profile Picture */}
        <div className="container flex justify-between items-center max-w-full mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-6xl font-bold italic text-gray-50 mb-2">
              {userInfo.username}
            </h1>
            <label className="text-base font-light text-gray-50 mb-2">
              Description
            </label>
            <textarea
              onChange={onChange}
              name="description"
              className="text-sm antialiased font-base text-white bg-gray-700 outline-none w-64 rounded-lg resize-none p-2 mb-2"
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

        <div className="container flex justify-between items-start max-w-full mb-10">
          <div className="flex flex-col">
            <label className="text-base antialiased font-medium text-white mb-2">
              Background-Color
            </label>
            <ChromePicker
              className="mb-2"
              disableAlpha
              color={color}
              onChangeComplete={handleColorChange}
            />
            {error2 ? (
              <p className="text-xs antialiased font-medium text-red-800 mt-2 mb-2">
                {error2}
              </p>
            ) : null}

            <p className="text-base font-light text-gray-50 mb-2">
              favorite Anime
            </p>
            <InputField
              props={{ version: 'anime', placeholder: 'Search Anime...' }}
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Manga
            </p>
            <InputField
              props={{ version: 'manga', placeholder: 'Search Manga...' }}
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Character
            </p>
            <InputField
              props={{
                version: 'character',
                placeholder: 'Search Character...',
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
