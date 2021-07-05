import React from 'react';
import Link from 'next/link';

export const GreetingContainer = ({ data, browseProfiles }) => {
  return (
    <div className="flex items-center justify-between p-8 bg-indigo-500 rounded-lg w-[54.5vw] h-72 mt-[1.6rem] mb-5">
      <div className="flex flex-col items-start">
        <h1 className="text-base font-bold italic text-gray-50 mb-4">
          Welcome {data.username} !
        </h1>
        <p className="text-base font-medium italic text-gray-50 mb-12">
          You already completed the first step as you created an account for
          yourself. <br /> Now you can create your personalized profile & share
          it with everyone.{' '}
        </p>
        <div className="flex text-base font-medium italic text-gray-50 justify-between items-center">
          <Link href="/createprofile">
            <button className="btn-lg text-base font-bold text-gray-50 italic bg-indigo-700 mr-8">
              Create Profile
            </button>
          </Link>
          or
          <button
            onClick={browseProfiles}
            className="btn-lg text-base font-bold text-indigo-700 italic bg-gray-50 ml-8"
          >
            Browse Profiles
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('./welcome.svg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '173px',
          width: '335px',
        }}
      />
    </div>
  );
};
