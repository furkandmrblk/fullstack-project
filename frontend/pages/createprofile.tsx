import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { getStandaloneApolloClient } from '../client';
import { Navbar } from '../components/Navbar';
import { LeftSidebar } from '../components/parts/LeftSidebar';
import { RightSidebar } from '../components/parts/RightSidebar';
import { CreateUserProfile } from '../components/CreateUserProfile';

export default function CreateProfilePage() {
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
        <CreateUserProfile />
        <RightSidebar />
      </div>
    </>
  );
}
