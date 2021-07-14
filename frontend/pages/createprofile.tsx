import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { CreateUserProfile } from '../components/Userprofile/CreateUserProfile';

export default function CreateProfilePage() {
  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />

        <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem] 2xl:mt-[4.55rem]">
          <LeftSidebar confetti={true} />
          <div className="flex flex-wrap items-center justify-center  w-auto pt-6">
            <CreateUserProfile />
          </div>
          <RightSidebar confetti={true} user="" />
        </div>
      </div>
    </>
  );
}
