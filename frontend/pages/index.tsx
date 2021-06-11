import { gql, useMutation, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { Login } from '../components/Login';
import { Navbar } from '../components/Navbar';
import { SignUp } from '../components/SignUp';

export default function Index() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const openSignUp = () => {
    setSignUp(!signUp);
  };

  const openSignIn = (e: any) => {
    setSignIn(!signIn);
    e.preventDefault();
  };

  const allProfiles = useQuery(getProfilesQ);

  return (
    <>
      <Head>
        <title>aniProfile - Homepage</title>
      </Head>
      <Navbar openregister={openSignUp} openlogin={openSignIn} />
      <Hero props={allProfiles} />
      <SignUp signup={signUp} openregister={openSignUp} />
      <Login signin={signIn} openlogin={openSignIn} />
    </>
  );
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
    loginUser(user: { username: $username, password: $password })
  }
`;

export const logoutUserM = gql`
  mutation {
    logoutUser
  }
`;
