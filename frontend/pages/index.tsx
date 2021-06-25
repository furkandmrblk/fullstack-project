import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Hero } from '../components/Layout/Hero';
import { Navbar } from '../components/Auth/Navbar';
import { Welcome } from '../components/Intro/Welcome';
import { Context } from '../reducer';
import { getCurrentUserQ } from '../components/Userprofile/CreateUserProfile';

export default function Index() {
  const authContext = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = JSON.parse(authContext.authState);
    setAuth(isAuth);
  });

  const allProfiles = useQuery(getProfilesQ);

  const profile = useQuery(getCurrentUserQ);

  if (profile.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>aniProfile - Homepage</title>
      </Head>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        {auth ? (
          <>
            <Hero props={allProfiles} profile={profile} />
          </>
        ) : (
          <Welcome />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getCurrentUserQ,
  });
  await client.query({
    query: getUsersQ,
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  };
}

// User Queries
export const getUsersQ = gql`
  query {
    getUsers {
      id
      username
      password
    }
  }
`;

export const getProfilesQ = gql`
  query {
    getUserProfiles {
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

// User Mutations

export const createUserM = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      password
    }
  }
`;

export const loginUserM = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(user: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const logoutUserM = gql`
  mutation {
    logoutUser
  }
`;

// Auth Mutation

export const updateTokensM = gql`
  mutation updateTokens {
    updateTokens {
      accessToken
    }
  }
`;
