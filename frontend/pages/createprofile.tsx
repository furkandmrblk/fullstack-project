import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { CreateUserProfile } from '../components/Userprofile/CreateUserProfile';

export default function CreateProfilePage() {
  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />

        <div
          className="container flex max-w-full justify-center items-start"
          style={{ height: '91vh', marginTop: '5.235rem' }}
        >
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap  w-[56vw] pt-[1.6rem]">
            <CreateUserProfile />
          </div>
          <RightSidebar confetti={false} />
        </div>
      </div>
    </>
  );
}
