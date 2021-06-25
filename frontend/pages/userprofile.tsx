import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { getStandaloneApolloClient } from '../client/standAloneClient';
import { Navbar } from '../components/Auth/Navbar';
import { LeftSidebar } from '../components/Layout/LeftSidebar';
import { RightSidebar } from '../components/Layout/RightSidebar';
import { UserProfile } from '../components/Userprofile/UserProfile';

export default function CurrentUserProfile() {
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
            <UserProfile props={userProfile} />
          </div>
          <RightSidebar confetti={false} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await getStandaloneApolloClient();

  await client.query({
    query: getCurrentUserProfileQ,
  });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  };
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

      finishedAnime
      watchingAnime
      watchlistAnime

      finishedManga
      watchingManga
      watchlistManga
    }
  }
`;
