import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { logoutUserM } from '../pages';
import { Context } from '../reducer';

export const Navbar = ({ openregister, openlogin }): JSX.Element => {
  const authContext = useContext(Context);
  const isAuth: boolean = JSON.parse(authContext.authState);
  //  macht bei isAuth === true error, aber nur bei index page

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

      authContext.authDispatch('logout');

      isOpen(open === false);
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
        <a
          href="/userprofile"
          className="text-base antialiased font-medium text-white my-1"
        >
          My Profile
        </a>
        <a
          href="#"
          className="text-base antialiased font-medium text-white my-1"
        >
          Edit Profile
        </a>
      </div>
    </>
  );
};
