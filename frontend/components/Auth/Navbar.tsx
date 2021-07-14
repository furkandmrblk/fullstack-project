import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { logoutUserM } from '../../graphql/Mutations';
import { getCurrentUserProfileQ } from '../../graphql/Queries';
import { setAccessToken } from '../../helpers/Tokens';
import { Context } from '../../reducer';
import { Settings } from '../Settings/Settings';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { AdjustmentsIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserCircleIcon, PencilAltIcon } from '@heroicons/react/solid';

export const Navbar = (): JSX.Element => {
  const router = useRouter();

  const authContext = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = JSON.parse(authContext.authState);
    setAuth(isAuth);
  });

  const profile = useQuery(getCurrentUserProfileQ);

  let hasProfile: boolean = undefined;

  if (profile.data === undefined) {
    hasProfile = false;
  } else {
    hasProfile = true;
  }

  const [open, isOpen] = useState(false);
  const [open2, isOpen2] = useState(false);

  const openMenu = () => {
    isOpen(!open);
  };

  const openProfileMenu = () => {
    isOpen2(!open2);
  };

  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const openSignUp = () => {
    setSignUp(!signUp);
  };

  const openSignIn = (e: any) => {
    setSignIn(!signIn);
    e.preventDefault();
  };

  const [settings, setSettings] = useState(false);

  const openSettings = () => {
    setSettings(!settings);
    if (open && open2) {
      isOpen(!open);
      isOpen2(!open2);
    } else if (open) {
      isOpen(!open);
    } else if (open2) {
      isOpen2(!open2);
    }
  };

  const [logout, logoutResult] = useMutation(logoutUserM, {
    async onCompleted() {
      setAccessToken(null);
      authContext.authDispatch('logout');
      router.push('/');
    },
  });

  const logoutCtx = async (e: any) => {
    e.preventDefault();

    try {
      await logout();

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
      <div className="z-50 fixed container py-4 px-16 max-w-full flex justify-between items-center  bg-indigo-900">
        <Link href="/">
          <div className="flex items-center justify-center h-[55px] w-[65px] bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm font-bold italic text-black">
              ani
              <span className="text-sm font-bold italic text-indigo-700">
                Spot
              </span>
            </span>
          </div>
        </Link>
        {auth ? (
          <>
            <div className="flex justify-between items-center w-96">
              <h1 className="text-base antialiased font-bold text-white cursor-pointer">
                News
              </h1>
              <h1 className="text-base antialiased font-bold text-white cursor-pointer">
                Upcoming Series
              </h1>
              <Link href="/rankings">
                <h1 className="text-base antialiased font-bold text-white cursor-pointer">
                  Rankings
                </h1>
              </Link>
            </div>
            <div className="flex justify-between items-center w-32">
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
            <div className="flex justify-between items-center w-52">
              <a
                onClick={openSignIn}
                href=""
                className="text-base font-bold italic text-white hover:text-indigo-100 transition duration-500 ease-in-out"
              >
                Login
              </a>
              <button
                onClick={openSignUp}
                className="btn text-black italic bg-gray-50"
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
        className="fixed mt-[5.3rem] z-[99] h-28 w-36 bg-indigo-900 right-0 rounded-bl-md flex flex-col justify-start items-start pt-6 pb-6 pl-6 overflow-hidden whitespace-nowrap"
      >
        <button
          onClick={openSettings}
          className="flex items-center justify-start text-base italic antialiased font-medium text-white my-1"
        >
          <AdjustmentsIcon className="h-5 w-5 mr-2" /> <span>Settings</span>
        </button>

        <a
          onClick={logoutCtx}
          className="flex items-center justify-start text-base italic antialiased font-medium text-white my-1"
        >
          <LogoutIcon className="h-5 w-5 mr-2" /> <span>Logout</span>
        </a>
      </div>
      <div
        style={{
          height: open2 ? '' : '0',
          paddingTop: open2 ? '' : '0',
          paddingBottom: open2 ? '' : '0',
          transition: 'all 350ms ease-in-out',
        }}
        className="fixed mt-[5.3rem] mr-[9rem] z-[99] h-28 w-36 bg-indigo-900 right-0 rounded-bl-md rounded-br-md flex flex-col justify-start items-start pt-6 pb-6 pl-5 overflow-hidden whitespace-nowrap"
      >
        {hasProfile ? (
          <>
            <a
              href="/userprofile"
              className="flex items-center justify-start text-base italic antialiased font-medium text-white my-1"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />{' '}
              <span>My Profile</span>
            </a>

            <a
              href="/editprofile"
              className="flex items-center justify-start text-base italic antialiased font-medium text-white my-1"
            >
              <PencilAltIcon className="h-5 w-5 mr-2" />{' '}
              <span>Edit Profile</span>
            </a>
          </>
        ) : (
          <>
            <a
              href="/createprofile"
              className="text-base italic antialiased font-medium text-white my-1"
            >
              Create Profile
            </a>
          </>
        )}
      </div>
      <Settings
        open={open}
        open2={open2}
        openmenu={openMenu}
        openprofilemenu={openProfileMenu}
        settings={settings}
        opensettings={openSettings}
      />
      <Login signin={signIn} openlogin={openSignIn} />
      <SignUp signup={signUp} openregister={openSignUp} />
    </>
  );
};
