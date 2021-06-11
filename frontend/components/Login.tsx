import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { z } from 'zod';
import { loginUserM } from '../pages';
import { Context } from '../reducer';

export const Login = ({ openlogin, signin }): JSX.Element => {
  const authContext = useContext(Context);

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
  const loginSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be 3 or more characters long.' })
      .max(30, { message: 'Username must be 30 or fewer characters long.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be 6 or more characters long.' }),
  });

  // Use createUser Mutation & Submit It
  const [login, loginResult] = useMutation(loginUserM, {
    variables: {
      username: username,
      password: password,
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      loginSchema.parse(data);
      await login({
        variables: { username: username, password: password },
      });

      setZodError(null);
      setError(null);

      setTimeout(openlogin(e), 100);
      authContext.authDispatch('login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(null);

        let customError = error.flatten().fieldErrors;

        if (customError.username) {
          setZodError(customError.username);
        } else if (customError.password) {
          setZodError(customError.password);
        }
      } else {
        setZodError(null);
        setError(error.message);
        console.log(error);
      }
    }
  };

  // Error Handler useState
  const [zodError, setZodError] = useState([]);
  const [error, setError] = useState('');

  return (
    <>
      {signin ? (
        <>
          <div className="absolute right-0 left-0 top-0 bottom-0 z-50 flex flex-col items-center h-64 w-80 mx-auto my-auto rounded-lg bg-gray-200 p-5 ">
            <h1 className="text-lg antialiased font-bold text-black mb-7">
              Sign In
            </h1>
            <div
              className="absolute right-0 top-0 mr-3 mt-3 h-4 w-4 cursor-pointer"
              style={{
                backgroundImage: `url('/closeIcon.svg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={openlogin}
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
                className="text-base antialiased font-base text-black bg-gray-200 border-[1px] border-black rounded-lg outline-none w-64 h-[2.5rem]  px-4  mb-3"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={onChange}
                className="text-base antialiased font-base text-black bg-gray-200 border-[1px] border-black rounded-lg outline-none w-64 h-[2.5rem]  px-4  mb-3"
              />
              <button
                type="submit"
                className="btn text-white bg-green-600 hover:bg-green-700 w-64"
              >
                Login
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
                <p className="text-xs antialiased font-medium text-red-600 mt-2">
                  {error}
                </p>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};
