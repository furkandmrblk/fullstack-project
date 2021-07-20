import React from 'react';

export const UserProfileList = ({ props, data }) => {
  return (
    <>
      <div className="flex flex-col justify-start items-start bg-gray-700 hover:bg-gray-800/80 transition duration-500 ease-in-out rounded-lg w-[19.5rem] h-[24rem] overflow-hidden p-6 2xl:w-[22.5rem]">
        <div className="container flex justify-between max-w-full items-center mb-4">
          <div
            className="flex justify-start items-center text-base antialiased font-base bg-none rounded-md outline-none w-[13.5rem] h-[2.25rem] px-4 2xl:w-[16.5rem]"
            style={{
              border: `1px solid ${props.color}`,
              color: `${props.color}`,
            }}
          >
            <h1>{props.name}</h1>
          </div>
          <div
            className="cursor-pointer"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '2.25rem',
              width: '2.25rem',
            }}
          />
        </div>

        <div className="scrollbar container h-full overflow-y-scroll pr-2">
          {props.version === 'finished' ? (
            <>
              {' '}
              {data.finishedAnimes.map((item: string, index: number) => (
                <div
                  key={index}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-gray-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] cursor-pointer px-4 mb-1"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
          {props.version === 'watching' ? (
            <>
              {' '}
              {data.watchingAnimes.map((item: string, index: number) => (
                <div
                  key={index}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-gray-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] cursor-pointer px-4 mb-1"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
          {props.version === 'watchlist' ? (
            <>
              {' '}
              {data.watchlistAnimes.map((item: string, index: number) => (
                <div
                  key={index}
                  className="container flex justify-start items-center text-sm antialiased font-base text-white  bg-gray-600 hover:bg-gray-600/50 transition duration-500 ease-in-out rounded-md outline-none max-w-full min-h-[2.25rem] cursor-pointer px-4 mb-1"
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
