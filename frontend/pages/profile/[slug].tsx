import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { Navbar } from '../../components/Auth/Navbar';
import { LeftSidebar } from '../../components/Layout/LeftSidebar';
import { RightSidebar } from '../../components/Layout/RightSidebar';
import { UserProfile } from '../../components/Userprofile/UserProfile';
import { getCurrentUserQ, getListQ, getProfileQ } from '../../graphql/Queries';

export default function ProfilePage({ slug }) {
  const id = slug.slug;

  const getProfile = useQuery(getProfileQ, {
    variables: {
      id: id,
    },
  });
  const profile = useQuery(getCurrentUserQ);

  if (profile.loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (getProfile.loading) {
    return <p className="text-white">Loading...</p>;
  }

  const userProfile = getProfile.data.getUserProfile;
  const user = profile.data.getCurrentUser;

  return (
    <>
      <div className="flex max-w-full" style={{ height: '91.5vh' }}>
        <Navbar />
        <div className="container flex max-w-full justify-center items-start h-[91vh] mt-[5.235rem] 2xl:mt-[4.55rem]">
          <LeftSidebar confetti={false} />
          <div className="flex flex-wrap items-center justify-center w-[56vw] pt-[1.6rem]">
            <UserProfile props={userProfile} list="" />
          </div>
          <RightSidebar confetti={false} user={user} />
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
