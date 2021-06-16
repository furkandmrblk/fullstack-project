import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { getStandaloneApolloClient } from '../client';
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

  const getProfile = useQuery(getCurrentUserProfileQ);

  if (getProfile.loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (getProfile.error) {
    console.log(getProfile.error);
  }

  if (getProfile.data === undefined) {
    router.push('/createprofile');
  }

  const userProfile = getProfile.data.getCurrentUserProfile;

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

// Muss mal schauen wie ich das hier reinbekomme, sodass der den accessToken mitnehmen kann
// export async function getServerSideProps() {
//   const client = await getStandaloneApolloClient();

//   await client.query({
//     query: getCurrentUserProfileQ,
//   });

//   return {
//     props: {
//       apolloStaticCache: client.cache.extract(),
//     },
//   };
// }

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
