import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { getStandaloneApolloClient } from '../../client/standAloneClient';
import { Navbar } from '../../components/Auth/Navbar';
import { LeftSidebar } from '../../components/Layout/LeftSidebar';
import { RightSidebar } from '../../components/Layout/RightSidebar';
import { UserProfile } from '../../components/Userprofile/UserProfile';
import { getListQ, getProfileQ } from '../../graphql/Queries';

export default function ProfilePage({ slug }) {
  const id = slug.slug;

  const getProfile = useQuery(getProfileQ, {
    variables: {
      id: id,
    },
  });

  if (getProfile.loading) {
    return <p className="text-white">Loading...</p>;
  }

  const userProfile = getProfile.data.getUserProfile;
  const userId = userProfile.user.id;

  const getList = useQuery(getListQ, {
    variables: {
      id: userId,
    },
  });

  const listData = getList.data;
  console.log(listData);

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
            {/* <UserProfile props={userProfile} list={listData} /> */}
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

  // await client.query({
  //   query: getListQ,
  //   variables: { id: '' },
  // });

  return {
    props: {
      apolloStaticCache: client.cache.extract(),
      slug: params,
    },
  };
}
