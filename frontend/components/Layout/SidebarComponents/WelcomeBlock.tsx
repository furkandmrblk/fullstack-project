import React from 'react';
import { useState } from 'react';

export const WelcomeBlock = ({ user }) => {
  const [mood, setMood] = useState('');

  const superHappy: string[] = [
    "Yeeey! That's great to see that you are doing really well. Have fun on aniSpot too! ✌️",
    "Let's go! Whatever made your day that great, we wish that it continues like this. 🌈",
    "Uuuuhh, today's a perfect day huh. Let's keep up the positivity and have a great time! ✨",
  ];
  const happy: string[] = [
    "Nice! We hope you'll have fun on aniSpot too! 🥰",
    "That's great news! Love it that you're happy. That makes us happy too! 😋",
    "Perfect! Keep it up & don't let anyone ruin your day! Have fun. 😙",
  ];
  const moderate: string[] = [
    "Uh.. everyone has these days, so don't worry! We hope that you'll get a little happier on aniSpot! 😊",
    "That's totally fine! Tomorrow will be your perfect day! Never give up & be positive. 😇",
    "It's okay to have a moderate day & we're sure that you'll have a great time in the coming days! 😚",
  ];
  const bad: string[] = [
    "Don't be sad! Whatever happened will get better & you're strong! Don't let anyone tell you otherwise.. 🤗",
    "We're here for you.. or your friends & family. Keep your head up! You will get through this. 😉",
    "We know it sounds stupid but.. everything will get better! You're too hot to be sad! Keep slaying.. 😘",
  ];
  const superBad: string[] = [
    "Uh, so it's really bad today.. don't worry! Talk about it with your friends or family, listen to some music or watch some animes.. We wish you the best.. 🥺",
    "Don't be sad.. There are fantastic days waiting just for you! We know that you're strong & that you will get through this.. 🤗",
    "Ugh, that sucks.. But you shouldn't worry too much! As you probably know, you will forget about this & live your best life! Don't drop this.. 👑 We wish you the absolute best! 🥰",
  ];

  const selectRandomElement = (arr: string[]) => {
    const randomElement: number = Math.floor(Math.random() * arr.length);

    return setMood(arr[randomElement]);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-auto rounded-lg text-white bg-indigo-700/50 p-6 mb-4">
        <h1 className="text-base font-bold mb-6">
          {' '}
          Welcome back <span className="italic">{user.username}</span>!
        </h1>

        <h1 className="text-base mb-2">How was your day?</h1>

        <div className="flex items-center justify-between w-36 mb-6">
          <h1
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(superHappy);
            }}
            className="cursor-pointer"
          >
            🥳
          </h1>
          <h1
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(happy);
            }}
            className="cursor-pointer"
          >
            😊
          </h1>
          <h1
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(moderate);
            }}
            className="cursor-pointer"
          >
            😐
          </h1>
          <h1
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(bad);
            }}
            className="cursor-pointer"
          >
            😖
          </h1>
          <h1
            onClick={(e) => {
              e.preventDefault();
              selectRandomElement(superBad);
            }}
            className="cursor-pointer"
          >
            😭
          </h1>
        </div>
        {mood ? <h1 className="text-xs text-justify">{mood}</h1> : null}
      </div>
    </>
  );
};
