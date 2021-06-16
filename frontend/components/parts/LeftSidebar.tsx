import React from 'react';

export const LeftSidebar = (): JSX.Element => {
  return (
    <div
      className=" absolute fixed left-0 flex flex-none flex-col justify-between items-center p-8 bg-gray-800 w-96"
      style={{ height: '91.5vh', marginTop: '8.5vh' }}
    ></div>
  );
};
