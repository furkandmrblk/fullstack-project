import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LeftSidebar } from '../components/parts/LeftSidebar';
import { RightSidebar } from '../components/parts/RightSidebar';
import { EditUserProfile } from '../components/EditUserProfile';

export default function EditProfilePage() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const openSignUp = () => {
    setSignUp(!signUp);
  };

  const openSignIn = (e: any) => {
    setSignIn(!signIn);
    e.preventDefault();
  };

  return (
    <>
      <Navbar openregister={openSignUp} openlogin={openSignIn} />
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <LeftSidebar />
        <EditUserProfile />
        <RightSidebar />
      </div>
    </>
  );
}
