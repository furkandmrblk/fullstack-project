import React from 'react';

export const RightSidebar = ({ confetti }): JSX.Element => {
  return (
    <div className="fixed right-0 bottom-0 flex flex-none flex-col justify-between items-center bg-indigo-100 rounded-lg overflow-hidden w-96 h-[820px] mb-4 mr-4">
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
      ) : null}
    </div>
  );
};
