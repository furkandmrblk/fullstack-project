import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { setAccessToken } from '../helpers/Tokens';
import { logoutUserM, updateTokensM } from '../pages';
import { getCurrentUserProfileQ } from '../pages/userprofile';
import { Context } from '../reducer';

export const Navbar = ({ openregister, openlogin }): JSX.Element => {
  const authContext = useContext(Context);

  const isAuth = JSON.parse(authContext.authState);
  //  macht bei isAuth === true error, aber nur bei index page

  const profile = useQuery(getCurrentUserProfileQ);

  let userProfile: boolean = undefined;
  if (profile.data === undefined) {
    userProfile = false;
  } else {
    userProfile = true;
  }

  const [open, isOpen] = useState(false);
  const [open2, isOpen2] = useState(false);

  const openMenu = () => {
    isOpen(!open);
  };

  const openProfileMenu = () => {
    isOpen2(!open2);
  };

  const [logout, logoutResult] = useMutation(logoutUserM);

  const logoutCtx = async (e: any) => {
    e.preventDefault();

    try {
      await logout();

      setAccessToken(null);
      authContext.authDispatch('logout');

      if (open === true) {
        isOpen(!open);
      }

      if (open2 === true) {
        isOpen2(!open2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="absolute fixed container py-5 px-16 max-w-full flex justify-between items-center  bg-gray-900">
        <a
          href="/"
          className="text-lg antialiased font-medium text-white cursor-pointer"
        >
          aniProfile
        </a>
        {isAuth ? (
          <>
            <div className="flex justify-between items-center w-64">
              <div className="cursor-pointer" onClick={openProfileMenu}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="14" cy="8" r="8" fill="white" />
                  <path
                    d="M0 29C0 22.3726 5.37258 17 12 17H17C23.6274 17 29 22.3726 29 29H0Z"
                    fill="white"
                  />
                </svg>
              </div>
              <button className="btn text-black bg-white hover:text-white hover:bg-red-600">
                Statistics
              </button>
              <div
                onClick={openMenu}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <div className="hamburger my-1" />
                <div className="hamburger my-1" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-44">
              <a
                onClick={openlogin}
                href=""
                className="text-base antialiased font-medium text-white my-1"
              >
                Login
              </a>
              <button
                onClick={openregister}
                className="btn text-black bg-white hover:text-white hover:bg-red-600"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          height: open ? '' : '0',
          paddingTop: open ? '' : '0',
          paddingBottom: open ? '' : '0',
          transition: 'all 350ms ease-in-out',
        }}
        className="container mt-[5rem] z-50 h-32 w-64 bg-gray-900 absolute right-0 rounded-bl-lg flex flex-col justify-start items-center p-5 overflow-hidden whitespace-nowrap"
      >
        <a
          href="#"
          className="text-base antialiased font-medium text-white my-1"
        >
          Settings
        </a>
        <a
          onClick={logoutCtx}
          href=""
          className="text-base antialiased font-medium text-white my-1"
        >
          Logout
        </a>
      </div>
      <div
        style={{
          height: open2 ? '' : '0',
          paddingTop: open2 ? '' : '0',
          paddingBottom: open2 ? '' : '0',
          transition: 'all 350ms ease-in-out',
        }}
        className="container mt-[5rem] mr-[16rem] z-[99] h-32 w-64 bg-gray-900 absolute right-0 rounded-bl-lg rounded-br-lg flex flex-col justify-start items-center p-5 overflow-hidden whitespace-nowrap"
      >
        {userProfile ? (
          <>
            <a
              href="/userprofile"
              className="text-base antialiased font-medium text-white my-1"
            >
              My Profile
            </a>

            <a
              href="/editprofile"
              className="text-base antialiased font-medium text-white my-1"
            >
              Edit Profile
            </a>
          </>
        ) : (
          <>
            <a
              href="/createprofile"
              className="text-base antialiased font-medium text-white my-1"
            >
              Create Profile
            </a>
          </>
        )}
      </div>
    </>
  );
};
