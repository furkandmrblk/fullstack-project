import React from 'react';

export const LeftSidebar = (): JSX.Element => {
  return (
    <>
      {/* Left Sidebar */}
      <div
        className=" absolute fixed left-0 flex flex-none flex-col justify-between items-center p-8 bg-gray-800 w-96"
        style={{ height: '91.5vh', marginTop: '8.5vh' }}
      >
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
    </>
  );
};
