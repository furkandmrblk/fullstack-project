import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useState } from 'react';
import { setAccessToken } from '../../../helpers/Tokens';
import { logoutUserM } from '../../../pages';
import { Context } from '../../../reducer';
import { deleteUserM } from '../Settings';

export const DeleteUser = ({
  opendelete,
  openmenu,
  opensettings,
  openprofilemenu,
  open,
  open2,
}) => {
  const router = useRouter();

  const authContext = useContext(Context);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [data, setData] = useState({
    password: '',
  });

  const { password } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [deleteAccount, deleteAccountResult] = useMutation(deleteUserM, {
    variables: {
      password: password,
    },
  });

  const [logout, logoutResult] = useMutation(logoutUserM);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await deleteAccount({
        variables: { password: password },
      });

      setSuccess('Successfully deleted account.');
      setError(null);

      if (open === true) openmenu;
      if (open2 === true) openprofilemenu;

      setTimeout(opensettings, 500);

      setAccessToken(null);
      await logout();
      authContext.authDispatch('logout');

      await router.push('/');
    } catch (error) {
      setError(error.message);
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
        onClick={opendelete}
      />
      <h1 className="text-xs w-64 text-center mb-3">
        Are you sure that you want to delete your account? 😭 <br /> If you
        still want to continue please type in your{' '}
        <span className="font-bold">password</span> to delete your account.
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          onChange={onChange}
          name="password"
          type="password"
          className="text-base antialiased font-base text-black bg-white border-[1px] border-white rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3"
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
          className="btn text-white bg-red-500 border-[1px] border-red-500  hover:bg-red-700  w-64"
        >
          Delete Account
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
