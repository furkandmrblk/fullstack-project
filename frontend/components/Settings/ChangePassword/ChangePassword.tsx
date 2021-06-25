import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { z } from 'zod';
import { changePasswordM } from '../Settings';

export const ChangePassword = ({ opensettings, openresetpw }) => {
    const [zodError, setZodError] = useState([]);
    const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [data, setData] = useState({
    password: '',
    oldPassword: '',
  });

  const { password, oldPassword } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [changePassword, passwordResult] = useMutation(changePasswordM, {
    variables: {
      password: password,
      oldPassword: oldPassword,
    },
  });

  const changeSchema = z.object({
    password: z
      .string()
      .min(6, { message: 'Password must be 6 or more characters long.' }),
    oldPassword: z
      .string()
      .min(6, { message: 'Password must be 6 or more characters long.' }),
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      changeSchema.parse(data);
      await changePassword({
        variables: { password: password, oldPassword: oldPassword },
      });

      setSuccess('Successfully changed password.');
      setError(null);
      setZodError(null);

      setTimeout(opensettings, 500);
      location.reload();
    } catch (error) {
      if (error instanceof z.ZodError) {
        let customError = error.flatten().fieldErrors;

        if (customError.password) {
            setZodError(customError.password);
        } else if (customError.oldPassword) {
            setZodError(customError.oldPassword);
        }
      } else {
        setZodError(null);
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
          onClick={openresetpw}
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center"
        >
        <h1 className="text-xs w-64 text-center mb-3">
          If you would like to change your password type your current password in here:
        </h1>
          <input
            onChange={onChange}
            placeholder="Current password"
            name="oldPassword"
            type="password"
            className="text-sm italic antialiased font-base text-black bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-1"
          />
          {error || zodError ? (
            <>
            {error ? <p className="text-xs antialiased font-medium text-red-600 mb-3">
                {error}
              </p> : null}
            {zodError ? <p className="text-xs antialiased font-medium text-red-600 mb-3">
                {zodError}
              </p> : null}
            </>
          ) : null}
          <h1 className="text-xs w-64 text-center mb-3">
          Type your new desired password in here:
        </h1>
          <input
            onChange={onChange}
            placeholder="New password"
            name="password"
            type="password"
            className="text-sm italic antialiased font-base text-black bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-1"
          />
          {zodError ? (
              <p className="text-xs antialiased font-medium text-red-600 mb-3">
                {zodError}
              </p>
          ) : null}
          <button
            type="submit"
            className="btn text-white bg-indigo-600 hover:bg-indigo-700 w-64"
          >
            Reset Password
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
    )
}
