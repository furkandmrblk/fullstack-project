import React from 'react';

export const WelcomeProfileCard = ({ props }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="absolute right-0 z-10 flex rounded-lg bg-indigo-900"
          style={{
            zIndex: props.z,
            margin: `${props.mt} ${props.mr} 0 0`,
          }}
        >
          <div
            className="flex flex-col items-start rounded-lg h-[370px] w-[485px] p-10"
            style={{
              background: `linear-gradient(270deg, ${props.color} -100%, rgba(67, 56, 202, 0) 100%)`,
            }}
          >
            <div className="container flex items-center justify-between max-w-full mb-8">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold italic text-gray-50 mb-1">
                  {props.name}
                </h1>
                <p className="text-sm font-light italic text-gray-50">
                  {props.description}
                </p>
              </div>
              <div
                className="rounded-full bg-gray-200 h-28 w-28"
                style={{
                  backgroundImage: `url('${props.picture}')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
            <div className="container flex items-start justify-between max-w-full">
              <div className="flex flex-col">
                <p className="text-sm font-bold italic text-gray-50 mb-1">
                  favorite Anime
                </p>
                <p className="text-sm font-light italic text-gray-50 mb-3">
                  {props.favAnime}
                </p>
                <p className="text-sm font-bold italic text-gray-50 mb-1">
                  favorite Manga
                </p>
                <p className="text-sm font-light italic text-gray-50 mb-3">
                  {props.favManga}
                </p>
                <p className="text-sm font-bold italic text-gray-50 mb-1">
                  favorite Character
                </p>
                <p className="text-sm font-light italic text-gray-50 mb-3">
                  {props.favChar}
                </p>
              </div>
              <div className="flex flex-col">
                <div
                  className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-1"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('./Finished.svg')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      height: '1.5rem',
                      width: '1.5rem',
                    }}
                  ></div>
                  <h1 className="text-sm font-light italic text-gray-50">
                    {props.finished}
                  </h1>
                </div>
                <div
                  className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-1"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('./Watching.svg')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      height: '1.5rem',
                      width: '1.5rem',
                    }}
                  ></div>
                  <h1 className="text-sm font-light italic text-gray-50">
                    {props.watching}
                  </h1>
                </div>
                <div
                  className="flex items-center justify-between bg-gray-700 rounded-lg w-28 p-[0.35rem] mb-3"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('./Watchlist.svg')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      height: '1.5rem',
                      width: '1.5rem',
                    }}
                  ></div>
                  <h1 className="text-sm font-light italic text-gray-50">
                    {props.watchlist}
                  </h1>
                </div>
                <button
                  className="btn-sm text-black text-sm italic bg-gray-50 hover:bg-gray-700 hover:text-gray-50"
                  style={{
                    filter: 'drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  Visit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute right-0 z-0 rounded-lg h-[370px] w-[485px] mr-32"
          style={{
            backgroundColor: `${props.color}`,
            filter: 'blur(50px)',

            margin: `${props.mt} ${props.mr} 0 0`,
          }}
        />
      </div>
    </>
  );
};
