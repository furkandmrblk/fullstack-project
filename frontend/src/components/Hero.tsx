import React from 'react';

export const Hero = () => {
  return (
    <div className="container flex max-w-full" style={{ height: '91.5vh' }}>
      {/* Left Sidebar */}
      <div className=" flex flex-none flex-col justify-between items-center p-8 bg-gray-800 w-96">
        <div className="flex flex-col justify-start items-center p-5 bg-gray-600 w-80 h-96 rounded-lg">
          <h1 className="text-base antialiased font-medium text-white mb-4">
            Top Favorite Animes
          </h1>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base antialiased font-light text-white">01</p>
            <p className="text-base antialiased font-light text-white">
              Tokyo Revengers
            </p>
            <p className="text-base antialiased font-light text-white">
              70.438
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center p-5 bg-gray-600 w-80 h-96 rounded-lg ">
          <h1 className="text-base antialiased font-medium text-white mb-4">
            Top Favorite Mangas
          </h1>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base antialiased font-light text-white">01</p>
            <p className="text-base antialiased font-light text-white">
              Jujutsu Kaisen
            </p>
            <p className="text-base antialiased font-light text-white">
              63.765
            </p>
          </div>
        </div>
      </div>
      {/* Middle Screen */}
      <div
        className="flex flex-1 flex-col justify-start items-start p-8 bg-gray-700 w-auto overflow-hidden
      "
      >
        {/* Searchbar */}
        <div className="flex justify-between items-center w-72 rounded-lg bg-gray-600 pt-2 pb-2 pr-4 pl-4 mb-5">
          <input
            className="text-base antialiased font-base text-white bg-gray-600 outline-none"
            placeholder="Search"
          />
          <svg
            className="cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M0.691229 20.374L6.90601 14.1592C5.72725 12.7039 5.0177 10.8539 5.0177 8.83956C5.0177 4.17007 8.81668 0.371094 13.4862 0.371094C18.1557 0.371094 21.9546 4.17007 21.9546 8.83956C21.9546 13.509 18.1556 17.308 13.4861 17.308C11.4718 17.308 9.62175 16.5984 8.1665 15.4197L1.95172 21.6345C1.7776 21.8085 1.49547 21.8085 1.32135 21.6345L0.691187 21.0043C0.517151 20.8302 0.517151 20.548 0.691229 20.374ZM13.4861 15.5252C17.1728 15.5252 20.1717 12.5262 20.1717 8.83956C20.1717 5.1529 17.1728 2.15394 13.4861 2.15394C9.79947 2.15394 6.80051 5.1529 6.80051 8.83956C6.80051 12.5262 9.79947 15.5252 13.4861 15.5252Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="21.3939"
                  height="21.3939"
                  fill="white"
                  transform="matrix(-1 0 0 1 21.9546 0.371094)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        {/* Userprofile Card */}
        <div className="flex">
          <div
            className="flex flex-col justify-start items-center p-5 rounded-lg h-64 w-72 mr-5"
            style={{
              background:
                'linear-gradient(180deg, #FF4853 -20%, rgba(247, 237, 238, 0) 100%)',
            }}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start">
                <h1 className="text-base antialiased font-medium text-black">
                  furkan 🍒
                </h1>
                <p
                  className="text-xs antialiased font-light text-black"
                  style={{ maxWidth: '9rem', textAlign: 'justify' }}
                >
                  21 y/o guy who is lost but got the spirit. I also like reading
                  mangas.
                </p>
              </div>
              <div
                className="rounded-full bg-gray-200 h-20 w-20"
                style={{
                  backgroundImage: `url('/izana.png')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-none flex-col justify-between items-center p-8 bg-gray-800 w-96 
      "
      >
        {/* Right Sidebar */}
        <div className="flex flex-col justify-start items-center p-5 bg-gray-600 w-80 h-96 rounded-lg">
          <h1 className="text-base antialiased font-medium text-white mb-4">
            Top Visited Profiles
          </h1>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base antialiased font-light text-white">01</p>
            <p className="text-base antialiased font-light text-white">
              furkan 🍒
            </p>
            <p className="text-base antialiased font-light text-white">
              70.438
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center p-5 bg-gray-600 w-80 h-96 rounded-lg ">
          <h1 className="text-base antialiased font-medium text-white mb-4">
            Top Favorite Characters
          </h1>
          <div className="flex justify-between items-center w-72 mb-2">
            <p className="text-base antialiased font-light text-white">01</p>
            <p className="text-base antialiased font-light text-white">
              Gojo Satoru
            </p>
            <p className="text-base antialiased font-light text-white">
              70.438
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
