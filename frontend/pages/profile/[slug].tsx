import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { Navbar } from '../../components/Auth/Navbar';
import { LeftSidebar } from '../../components/Layout/LeftSidebar';
import { RightSidebar } from '../../components/Layout/RightSidebar';
import { UserProfile } from '../../components/Userprofile/UserProfile';

export default function ProfilePage({ slug }) {
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

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        <div
          className="container flex max-w-full justify-center items-start"
          style={{ height: '91vh', marginTop: '5.235rem' }}
        >
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap w-[56vw] pt-[1.6rem]">
            <UserProfile props={userProfile} />
          </div>
          <RightSidebar confetti={false} />
        </div>
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
