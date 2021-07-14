import React, { useState } from 'react';
import { UsersIcon, PencilAltIcon, XIcon } from '@heroicons/react/solid';
import { Input } from './parts/Input';
import Image from 'next/image';
import dogPicture from '../../../public/dogundraw.svg';
import { FriendRequest } from './parts/FriendRequest';
import { useMutation, useQuery } from '@apollo/client';
import { getFriendList } from '../../../graphql/Queries';
import Link from 'next/link';
import { deleteFriendM } from '../../../graphql/Mutations';

export const Friendlist = () => {
  const [data, setData] = useState({
    id: undefined,
    user: undefined,
  });

  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const getFriends = useQuery(getFriendList);
  const [deleteFriend] = useMutation(deleteFriendM, {
    variables: {
      id: data.id,
    },
  });

  const onSubmit = async () => {
    try {
      setError(null);

      await deleteFriend({
        variables: {
          id: data.id,
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (getFriends.loading) {
    return <p>Loading...</p>;
  }

  const inputProps: object = {
    placeholder: 'Add a friend',
    icon: 'friendlist',
  };

  let href: string = 'profile/';

  const hrefPath = () => {
    if (window.location.pathname.includes('profile/')) {
      return (href = '');
    }
  };

  hrefPath();

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-auto max-h-[34.35rem] 2xl:max-h-[27.75rem] rounded-lg text-white bg-indigo-700/50 p-6 mb-4">
        <div className="flex items-start justify-between w-full mb-6">
          <h1>Friendlist</h1>
          <UsersIcon className="h-5 w-5 cursor-pointer" />
        </div>
        <Input props={inputProps} />
        <FriendRequest />
        {getFriends.data.getFriendList !== null ? (
          <>
            <div className="scrollbar-blue text-base antialiased text-white flex flex-col items-start justify-start bg-none h-auto max-h-[23.5rem] w-[19.5rem] overflow-y-scroll mt-2 pr-2">
              {getFriends.data.getFriendList.map(
                (friend: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group w-full bg-indigo-700/30 hover:bg-indigo-800/40 transition duration-500 ease-in-out rounded-lg pt-2 pb-2 pl-4 pr-4 mb-2"
                  >
                    <h1 className="w-full rounded-lg">{friend.username}</h1>
                    <form onSubmit={onSubmit} className="flex items-center">
                      {showDelete ? (
                        <>
                          {' '}
                          <button
                            type="submit"
                            className="btn-side text-white antialiased bg-red-500 hover:bg-red-600 pt-1 pb-1 pl-2 pr-2 mr-4"
                          >
                            Delete
                          </button>
                          <XIcon
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDelete(false);
                              setData({ id: undefined, user: undefined });
                            }}
                            height="18"
                            width="18"
                          />{' '}
                        </>
                      ) : (
                        <>
                          {' '}
                          <PencilAltIcon
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDelete(true);
                              setData({
                                id: friend.id,
                                user: friend.username,
                              });
                            }}
                            className="hidden mr-4 cursor-pointer group-hover:block"
                            height="20"
                            width="20"
                          />
                          <Link href={href + friend.userprofile.id}>
                            <button className="btn-side text-black antialiased bg-white hover:bg-indigo-900 hover:text-white pt-1 pb-1 pl-2 pr-2">
                              Visit
                            </button>
                          </Link>
                        </>
                      )}
                    </form>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs text-white flex flex-col items-start justify-center bg-none rounded-lg h-auto mt-2">
              <h1 className="mb-2">
                Oh.. you should add some people and make friends!
              </h1>
              <Image src={dogPicture} height="550" />
            </div>
          </>
        )}
      </div>
    </>
  );
};
