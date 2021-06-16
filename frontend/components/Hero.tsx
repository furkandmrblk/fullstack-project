import React from 'react';
import { LeftSidebar } from './parts/LeftSidebar';
import { MiddleScreen } from './parts/MiddleScreen';
import { RightSidebar } from './parts/RightSidebar';
import { AnimeChart } from './parts/AnimeChart';
import { MangaChart } from './parts/MangaChart';

export const Hero = ({ props }): JSX.Element => {
  // If the data is still loading or an error occurs, then we will return the messages below.
  if (props.loading) {
    return <p>Loading...</p>;
  }
  if (props.error) {
    return <p>An error has occured. {props.error.message}</p>;
  }

  // Now we pass on the props that we received from our index page
  const data = props.data.getUserProfiles;

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Middle Screen */}
        <MiddleScreen props={data} />

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </>
  );
};
