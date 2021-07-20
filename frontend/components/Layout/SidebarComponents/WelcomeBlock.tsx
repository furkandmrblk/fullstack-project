import React from 'react';
import { useState } from 'react';
import { getNumber, setNumber } from '../../../pages/api';
import { HomeIcon } from '@heroicons/react/solid';

export const WelcomeBlock = ({ user }) => {
  const [mood, setMood] = useState('');

  const superHappy: string[] = [
    "Yeeey! That's great to see that you are doing really well. Have fun on aniSpot too! ✌️",
    "Let's go! Whatever made your day great, we wish for you that it continues like this. 🌈",
    "Uuuuhh, today's a perfect day huh. Let's keep up the positivity and have a great time! ✨",
    "That's what we like to see! Live your best life & be the happiest version of yourself! ⚡️",
    "Period. You shouldn't settle for less happiness. Go achieve your dreams! 🥳",
  ];
  const happy: string[] = [
    "Nice! We hope you'll have fun on aniSpot too! 🥰",
    "That's great news! Love it that you're happy. That makes us happy too! 😋",
    "Perfect! Keep it up & don't let anyone ruin your day! Have fun. 😙",
    'Nice! We love that! Go get your funky love 🙃',
  ];
  const moderate: string[] = [
    "Uh.. everyone has these days, so don't worry! We hope that you'll get a little happier on aniSpot! 😊",
    "That's totally fine! Tomorrow will be your perfect day! Never give up & be positive. 😇",
    "It's okay to have a moderate day & we're sure that you'll have a great time in the coming days! 😚",
    'Well, a moderate day can also be a good day! Focus on the good aspects ✌️',
    'Dont worry about it, tomorrow will be your day! ⚡️',
  ];
  const bad: string[] = [
    "Don't be sad! Whatever happened will get better & you're strong! Don't let anyone tell you otherwise.. 🤗",
    "We're here for you.. or your friends & family. Keep your head up! You will get through this. 😉",
    "We know it sounds stupid but.. everything will get better! You're too hot to be sad! Keep slaying.. 😘",
    "Sometimes there are days that are.. not so good, BUT thats fine. We're sure that you'll have a great time in the coming days 🥰",
  ];
  const superBad: string[] = [
    "Uh, so it's really bad today.. don't worry! Talk about it with your friends or family, listen to some music or watch some animes.. We wish you the best.. 🥺",
    "Don't be sad.. There are fantastic days waiting just for you! We know that you're strong & that you will get through this.. 🤗",
    "Ugh, that sucks.. But you shouldn't worry too much! As you probably know, you will forget about this & live your best life! Don't drop this.. 👑",
    "You can push through these hard days! You are strong and you should know that. Think of the good memories you had & don't listen to hateful people ❤️",
  ];

  const selectRandomElement = (arr: string[]) => {
    let randomElement: number = Math.floor(Math.random() * arr.length);

    while (randomElement === getNumber()) {
      randomElement = Math.floor(Math.random() * arr.length);
    }

    setNumber(randomElement);

    return setMood(arr[randomElement]);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full min-h-[14.15rem] rounded-lg text-white bg-indigo-700/50 p-6 mb-4">
        <div className="flex items-start justify-between w-full">
          <h1 className="text-base font-bold mb-6">
            {' '}
            Welcome back <span className="italic">{user.username}</span>!
          </h1>
          <HomeIcon className="h-5 w-5 cursor-pointer" />
        </div>

        <h1 className="text-base mb-2">How was your day?</h1>

        <div className="flex items-center justify-between w-36 mb-6">
          <div
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(superHappy);
            }}
            className="cursor-pointer select-none pt-1 pb-1 pl-[1.15rem] pr-[1.15rem] rounded-lg bg-green-500/90 mr-1 hover:scale-[110%] transition duration-500 ease-in-out"
          >
            🥳
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(happy);
            }}
            className="cursor-pointer select-none pt-1 pb-1 pl-[1.15rem] pr-[1.15rem] rounded-lg bg-green-500/70 mr-1 hover:scale-[110%] transition duration-500 ease-in-out"
          >
            😊
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(moderate);
            }}
            className="cursor-pointer select-none pt-1 pb-1 pl-[1.15rem] pr-[1.15rem] rounded-lg bg-yellow-400/70 mr-1 hover:scale-[110%] transition duration-500 ease-in-out"
          >
            😐
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(bad);
            }}
            className="cursor-pointer select-none pt-1 pb-1 pl-[1.15rem] pr-[1.15rem] rounded-lg bg-yellow-600/70 mr-1 hover:scale-[110%] transition duration-500 ease-in-out"
          >
            😖
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(superBad);
            }}
            className="cursor-pointer select-none pt-1 pb-1 pl-[1.15rem] pr-[1.15rem] rounded-lg bg-red-500/70 hover:scale-[110%] transition duration-500 ease-in-out"
          >
            😭
          </div>
        </div>
        {mood ? (
          <h1 className="text-xs text-justify bg-indigo-700/30 rounded-lg p-2 mt-[-0.55rem]">
            {mood}
          </h1>
        ) : null}
      </div>
    </>
  );
};
