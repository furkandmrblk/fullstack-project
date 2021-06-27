import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { z } from 'zod';
import { changeUsernameM } from '../../../graphql/Mutations';

export const ChangeUsername = ({ openchangename, opensettings }) => {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState('');

  const [data, setData] = useState({
    username: '',
  });

  const { username } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [changeUsername, usernameResult] = useMutation(changeUsernameM, {
    variables: {
      username: username,
    },
  });

  const changeSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be 3 or more characters long.' })
      .max(30, { message: 'Username must be 30 or fewer characters long.' }),
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      changeSchema.parse(data);
      await changeUsername({
        variables: { username: username },
      });

      setSuccess('Successfully changed username.');
      setError(null);

      setTimeout(opensettings, 500);
      location.reload();
    } catch (error) {
      if (error instanceof z.ZodError) {
        let customError = error.flatten().fieldErrors;

        setError(customError.username);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 ml-9 mt-7 h-3 w-[0.7rem] cursor-pointer"
        style={{
          backgroundImage: `url('/backIcon.svg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={openchangename}
      />
      <h1 className="text-xs w-64 text-center mb-3">
        So you want to change your username, huh. We hope that you will enjoy
        your new username! ✌️
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          onChange={onChange}
          name="username"
          type="username"
          className="text-base antialiased font-base text-black bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-1"
        />
        {error ? (
          <>
            <p className="text-xs antialiased font-medium text-red-600 mb-3">
              {error}
            </p>
          </>
        ) : null}
        <button
          type="submit"
          className="btn text-white bg-indigo-600 hover:bg-indigo-700 w-64"
        >
          Change Username
        </button>
        {success ? (
          <>
            {' '}
            <p className="text-xs antialiased font-medium text-green-600 mt-2">
              {success}
            </p>{' '}
          </>
        ) : null}
      </form>
    </>
  );
};
