import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { custom, z, ZodError } from 'zod';
import { createUserM } from '../../graphql/Mutations';

export const SignUp = ({ signup, openregister }): JSX.Element => {
  // Fetch Data From Inputs
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Zod Validation Schema
  const registerSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be 3 or more characters long.' })
      .max(30, { message: 'Username must be 30 or fewer characters long.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be 6 or more characters long.' }),
  });

  // Use createUser Mutation & Submit It
  const [register, registerResult] = useMutation(createUserM, {
    variables: {
      username: username,
      password: password,
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      registerSchema.parse(data);
      await register({
        variables: { username: username, password: password },
      });
      setZodError(null);
      setError(null);
      setSuccess('Successfully created account.');
      setTimeout(openregister, 750);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setSuccess(null);
        setError(null);

        let customError = error.flatten().fieldErrors;

        if (customError.username) {
          setZodError(customError.username);
        } else if (customError.password) {
          setZodError(customError.password);
        }
      } else {
        setSuccess(null);
        setZodError(null);
        setError(error.message);
      }
    }
  };

  // Error Handler useState
  const [zodError, setZodError] = useState([]);
  const [error, setError] = useState('');
  // Success Handler useState
  const [success, setSuccess] = useState('');

  return (
    <>
      {signup ? (
        <>
          <div className="fixed right-0 left-0 top-0 bottom-0 z-50 flex flex-col items-center h-64 w-80 mx-auto my-auto rounded-lg bg-indigo-900 p-5 ">
            <h1 className="text-lg text-white antialiased font-bold mb-7">
              Sign Up
            </h1>
            <div
              className="absolute right-0 top-0 mr-3 mt-3 h-4 w-4 cursor-pointer"
              style={{
                backgroundImage: `url('/closeIcon.svg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={openregister}
            />

            <form
              onSubmit={onSubmit}
              className="flex flex-col items-start w-64"
            >
              <input
                name="username"
                type="text"
                placeholder="username"
                onChange={onChange}
                className="text-base antialiased font-base text-black italic bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={onChange}
                className="text-base antialiased font-base text-black italic bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3"
              />
              <button
                type="submit"
                className="btn text-white bg-indigo-600 hover:bg-indigo-700 w-64"
              >
                Register
              </button>
            </form>
            {zodError ? (
              <>
                <p className="text-xs antialiased font-medium text-red-600 mt-2">
                  {zodError}
                </p>
              </>
            ) : null}
            {error ? (
              <>
                <p className="text-xs antialiased font-medium italic text-red-600 mt-2">
                  Username {error}
                </p>
              </>
            ) : null}
            {success ? (
              <>
                {' '}
                <p className="text-xs antialiased font-medium italic text-green-600 mt-2">
                  {success}
                </p>{' '}
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};
