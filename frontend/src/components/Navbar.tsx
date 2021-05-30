import React, { useState } from 'react';

export const Navbar = () => {
  const [open, isOpen] = useState(false);
  const isAuth = false;

  const openMenu = () => {
    isOpen(!open);
  };

  return (
    <>
      <div className="container py-5 px-16 max-w-full flex justify-between items-center  bg-gray-900">
        <a className="text-lg antialiased font-medium text-white cursor-pointer">
          aniProfile
        </a>
        {isAuth ? (
          <>
            <div className="flex justify-between items-center w-64">
              <a href="">
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
              </a>
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
                href=""
                className="text-base antialiased font-medium text-white my-1"
              >
                Login
              </a>
              <button className="btn text-black bg-white hover:text-white hover:bg-red-600">
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
      <div
        open={open}
        style={{
          height: open ? '' : '0',
          paddingTop: open ? '' : '0',
          paddingBottom: open ? '' : '0',
          transition: 'all 350ms ease-in-out',
        }}
        className="container h-32 w-64 bg-gray-900 absolute right-0 rounded-bl-lg flex flex-col justify-start items-center p-5 overflow-hidden whitespace-nowrap"
      >
        <a
          href=""
          className="text-base antialiased font-medium text-white my-1"
        >
          Settings
        </a>
        <a
          href=""
          className="text-base antialiased font-medium text-white my-1"
        >
          Logout
        </a>
      </div>
    </>
  );
};
