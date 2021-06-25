import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { z } from 'zod';
import { ChromePicker } from 'react-color'

export const EditUserProfile = ({ props }) => {
  const router = useRouter();

  const profile = props;

  const [data, setData] = useState({
    description: undefined,
    favoriteAnime: undefined,
    favoriteManga: undefined,
    favoriteChar: undefined,
  });

  const { description, favoriteAnime, favoriteManga, favoriteChar } =
  data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const [pickColor, setPickedColor] = useState({ color: profile.color });

  const { color } = pickColor;

  const handleColorChange = (color) => {
   setPickedColor({ color: color.hex });
  }

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
      favoriteChar: favoriteChar,
      favoriteAnime: favoriteAnime,
      favoriteManga: favoriteManga,
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // editSchema.parse(data);
      setError(null);

      await updateProfile({
        variables: {
          description: description,
          color: color,
          favoriteChar: favoriteChar,
          favoriteAnime: favoriteAnime,
          favoriteManga: favoriteManga,
        },
      });

      await router.push('/userprofile');
      location.reload();
    } catch (err) {
      console.log(err);
      // if (err instanceof z.ZodError) {
      //   let customError = err.flatten().fieldErrors;
      //   setError(customError.description);
      // }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center bg-indigo-900 rounded-lg w-[56vw] h-[820px]"
    >
      <div
        className="flex flex-col items-start rounded-lg w-[56vw] h-[820px] p-16"
        style={{
          background: `linear-gradient(270deg, ${color} -10%, rgba(67, 56, 202, 0) 100%)`,
        }}
      >
        {/* Username, Description & Profile Picture */}
        <div className="container flex justify-between items-center max-w-full mb-10">
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
              className="text-sm antialiased font-base text-white italic bg-gray-700 outline-none w-64 rounded-lg resize-none p-2 mb-2"
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
            <ChromePicker className="mb-8" disableAlpha color={color} onChangeComplete={handleColorChange} />

            <p className="text-base font-light text-gray-50 mb-2">
              favorite Anime
            </p>
            <input
              onChange={onChange}
              type="text"
              name="favoriteAnime"
              className="text-sm antialiased font-base text-white italic bg-gray-700 outline-none w-64 rounded-lg p-1 mb-2"
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Manga
            </p>
            <input
              onChange={onChange}
              type="text"
              name="favoriteManga"
              className="text-sm antialiased font-base text-white italic bg-gray-700 outline-none w-64 rounded-lg p-1 mb-2"
            />
            <p className="text-base font-light text-gray-50 mb-2">
              favorite Character
            </p>
            <input
              onChange={onChange}
              type="text"
              name="favoriteChar"
              className="text-sm antialiased font-base text-white italic bg-gray-700 outline-none w-64 rounded-lg p-1 mb-2"
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

        {/* Category */}

        {/* Watchlist */}
        <button
          type="submit"
          className="absolute bottom-0 z-50 btn-lg text-white bg-green-600 hover:bg-green-700 w-30 mb-10 ml-[50rem]"
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
