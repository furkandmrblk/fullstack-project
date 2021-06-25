import React, { useState } from 'react';
import { WelcomeProfileCard } from './WelcomeProfileCard';
import { SignUp } from '../Auth/SignUp';

export const Welcome = () => {
  const [signUp, setSignUp] = useState(false);

  const openSignUp = () => {
    setSignUp(!signUp);
  };

  const profiledata = {
    z: 20,
    mr: '25rem',
    mt: '20rem',
    color: '#4338CA',
    name: 'furkan 🍒',
    description: 'He was a lost boy with a rhythm',
    favAnime: 'Hunter x Hunter',
    favManga: 'Tokyo Revengers',
    favChar: 'Gojo Satoru',
    finished: '62',
    watching: '5',
    watchlist: '23',
    picture: './kpop.jpeg',
  };

  const profiledata2 = {
    z: 10,
    mr: '10rem',
    mt: '0',
    color: '#10B981',
    name: 'vnh 🌺',
    description: '20 y/o viatnemese strong boi',
    favAnime: 'Noblesse',
    favManga: 'Hells Paradise: Jogukuraku',
    favChar: 'Saitama',
    finished: '81',
    watching: '2',
    watchlist: '43',
    picture: './koreanrnb.jpeg',
  };

  return (
    <>
      <div
        className="container flex max-w-full px-32"
        style={{ height: '91.5vh' }}
      >
        <div className="container flex justify-between items-center max-w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-8xl font-bold  text-black mb-16">
              Welcome to ani
              <span className="text-8xl font-bold  text-indigo-700">
                Spot
              </span>
            </h1>
            <p className="text-xl text-black font-light max-w-[480px] mb-16 ml-2">
              Create yourself a profile & share it with your friends and the
              public in just two easy steps.
            </p>
            <button
              onClick={openSignUp}
              className="btn-lg text-xl text-white bg-indigo-700 hover:bg-indigo-800 ml-2"
            >
              Get started now
            </button>
          </div>
          <WelcomeProfileCard props={profiledata} />
          <WelcomeProfileCard props={profiledata2} />
        </div>
        <div className="absolute bottom-0 right-0 left-0">
          <svg
            width="1920"
            height="223"
            viewBox="0 0 1920 223"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M633.5 223C862.833 159.167 1441.5 30.1 1921.5 24.5V223H633.5Z"
              fill="#A5B4FC"
              fillOpacity="0.8"
            />
            <path
              d="M1642 222.999C1371.33 131.332 664 -39.8013 0 8.99874V222.999H1642Z"
              fill="#C7D2FE"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </div>
      <SignUp signup={signUp} openregister={openSignUp} />
    </>
  );
};
