import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { z } from 'zod';

export const CreateUserProfile = () => {
  const router = useRouter();

  const [data, setData] = useState({
    description: '',
    color: '',
    favoriteAnime: '',
    favoriteManga: '',
    favoriteChar: '',
  });

  const { description, color, favoriteAnime, favoriteManga, favoriteChar } =
    data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState([]);

  const profileSchema = z.object({
    description: z
      .string()
      .min(1, { message: 'Please fill in the description field.' })
      .max(155, {
        message: 'Description must be 155 or fewer characters long.',
      }),
  });

  const [createProfile, profileResult] = useMutation(createProfileM, {
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
      profileSchema.parse(data);
      await createProfile({
        variables: {
          description: description,
          color: color,
          favoriteChar: favoriteChar,
          favoriteAnime: favoriteAnime,
          favoriteManga: favoriteManga,
        },
      });

      await router.push('/userprofile');
    } catch (err) {
      console.log(err);

      if (err instanceof z.ZodError) {
        let customError = err.flatten().fieldErrors;
        setError(customError.description);
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
      className="flex flex-auto flex-col justify-start items-start pt-16 pb-16 pr-[7.1rem] pl-[7.1rem]"
      style={{
        minHeight: '91.5vh',
        margin: '8.5vh 24rem 0 24rem',
        background: `linear-gradient(180deg, #fff -130%, rgba(247, 237, 238, 0) 100%)`,
      }}
    >
      {/* Username, Description & Profile Picture */}
      <div className="flex justify-between items-center w-[100%] mb-20">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-7xl antialiased font-medium text-white">
            {userInfo.username}
          </h1>
          <label className="text-base antialiased font-medium text-white mb-2">
            Description
          </label>
          <textarea
            onChange={onChange}
            name="description"
            className="text-sm antialiased font-base text-black bg-none outline-none w-64 rounded-lg resize-none p-2 mb-2"
          />
          {error ? (
            <p className="text-xs antialiased font-medium text-red-800 mt-2 mb-2">
              {error}
            </p>
          ) : null}
          <label className="text-base antialiased font-medium text-white mb-2">
            Background-Color
          </label>
          <select
            onChange={onChange}
            name="color"
            id="1"
            className="text-sm antialiased font-base text-black bg-none outline-none w-64 rounded-lg resize-none p-2"
          >
            <option value="white">White</option>
            <option value="springgreen">Spring Green</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
            <option value="blue">Blue</option>
            <option value="cyan">Cyan</option>
            <option value="gold">Gold</option>
            <option value="antiquewhite">Antique White</option>
            <option value="chocolate">Chocolate</option>
            <option value="darkorchid">Dark Orchid</option>
            <option value="palevioletred">Pale Violet Red</option>
            <option value="peachpuff">Peach Puff</option>
          </select>
        </div>
        <div className="rounded-full bg-gray-200 h-52 w-52" />
      </div>
      {/* Favorite Anime, Manga & Character */}
      <div className="flex flex-col justify-center items-start">
        <label className="text-base antialiased font-medium text-white mb-2">
          Favorite Anime
        </label>
        <input
          onChange={onChange}
          type="text"
          name="favoriteAnime"
          className="text-sm antialiased font-base text-black bg-none outline-none w-64 rounded-lg p-1 mb-2"
        />
        <label className="text-base antialiased font-medium text-white mb-2">
          Favorite Manga
        </label>
        <input
          onChange={onChange}
          type="text"
          name="favoriteManga"
          className="text-sm antialiased font-base text-black bg-none outline-none w-64 rounded-lg p-1 mb-2"
        />
        <label className="text-base antialiased font-medium text-white mb-2">
          Favorite Character
        </label>
        <input
          onChange={onChange}
          type="text"
          name="favoriteChar"
          className="text-sm antialiased font-base text-black bg-none outline-none w-64 rounded-lg p-1 mb-2"
        />
      </div>
      {/* Category */}

      {/* Watchlist */}
      <button
        type="submit"
        className="absolute bottom-0 z-50 btn text-white bg-green-500 hover:bg-green-600 w-20 mb-10 ml-[50rem]"
      >
        Save
      </button>
    </form>
  );
};

// User Mutations

export const createProfileM = gql`
  mutation createProfile(
    $description: String!
    $color: String!
    $favoriteChar: String
    $favoriteAnime: String
    $favoriteManga: String
  ) {
    createProfile(
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
      id
      description
      color
      favoriteChar
      favoriteAnime
      favoriteManga
    }
  }
`;

// User Queries
export const getCurrentUserQ = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
    }
  }
`;
