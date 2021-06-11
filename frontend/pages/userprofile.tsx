import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { redirect } from 'next/dist/next-server/server/api-utils';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Navbar } from '../components/Navbar';
import { LeftSidebar } from '../components/parts/LeftSidebar';
import { RightSidebar } from '../components/parts/RightSidebar';
import { SignUp } from '../components/SignUp';
import { UserProfile } from '../components/UserProfile';

export default function CurrentUserProfile() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const router = useRouter();

  const { data, loading, error } = useQuery(getCurrentUserProfileQ);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  if (!data) {
    return router.push('/');
    // muss mit updateTokens hier rumspielen, sodass so ein Error nie zum Vorschein kommt
  }

  const userProfile = data.getCurrentUserProfile;

  const openSignUp = () => {
    setSignUp(!signUp);
  };

  const openSignIn = (e: any) => {
    setSignIn(!signIn);
    e.preventDefault();
  };

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar openregister={openSignUp} openlogin={openSignIn} />
        <LeftSidebar />
        <UserProfile props={userProfile} />
        <RightSidebar />
        <SignUp signup={signUp} openregister={openSignUp} />
        <Login signin={signIn} openlogin={openSignIn} />
      </div>
    </>
  );
}

// User Queries

export const getCurrentUserProfileQ = gql`
  query getCurrentUserProfile {
    getCurrentUserProfile {
      user {
        username
      }
      id
      description
      color
      favoriteChar
      favoriteAnime
      favoriteManga
    }
  }
`;
