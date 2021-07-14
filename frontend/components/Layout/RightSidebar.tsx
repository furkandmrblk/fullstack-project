import React from 'react';
import { Friendlist } from './SidebarComponents/Friendlist';
import { NotesBlock } from './SidebarComponents/NotesBlock';
import { WelcomeBlock } from './SidebarComponents/WelcomeBlock';

export const RightSidebar = ({ confetti, user }): JSX.Element => {
  const data = user;

  return (
    <div className="z-50 fixed right-0 bottom-0 flex flex-col items-center bg-indigo-700/50  rounded-lg overflow-hidden p-4 h-[87vh] w-[24.5rem] 2xl:mr-3 2xl:mb-3 lg:hidden mb-4 mr-4">
      {confetti ? (
        <div
          className="w-[500px] h-[900px]"
          style={{
            backgroundImage: `url('./Confetti.svg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : (
        <>
          <WelcomeBlock user={data} />
          <Friendlist />
          {/* <NotesBlock /> */}
        </>
      )}
    </div>
  );
};
