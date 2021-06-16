import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useState } from 'react';
import { client, getStandaloneApolloClient } from '../../client';
import { Login } from '../../components/Login';
import { Navbar } from '../../components/Navbar';
import { LeftSidebar } from '../../components/parts/LeftSidebar';
import { RightSidebar } from '../../components/parts/RightSidebar';
import { SignUp } from '../../components/SignUp';
import { UserProfile } from '../../components/UserProfile';

export default function ProfilePage({ slug }) {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const id = slug.slug;

  const { data, loading, error } = useQuery(getProfileQ, {
    variables: {
      id: id,
    },
  });

  while (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-white">Oops! An error has occurred.</p>;
  }

  const userProfile = data.getUserProfile;

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

// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: gql`
//       query getUserProfiles {
//         getUserProfiles {
//           user {
//             username
//           }
//           id
//           description
//           color
//           favoriteChar
//           favoriteAnime
//           favoriteManga
//         }
//       }
//     `,
//   });

//   return {
//     paths: data.getUserProfiles.map((profile: any) => ({
//       params: { slug: profile.id },
//     })),
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params }) {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getProfileQ,
    variables: { id: params?.slug },
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
      slug: params,
    },
  };
}

export const getProfileQ = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      user {
        username
      }
      id
      description
      color
      favoriteAnime
      favoriteManga
      favoriteChar
    }
  }
`;
