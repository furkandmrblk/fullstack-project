import React, { useState } from 'react';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { useMutation, useQuery } from '@apollo/client';
import { getFriendRequestsQ } from '../../../../graphql/Queries';
import { acceptFriendRequestM } from '../../../../graphql/Mutations';

export const FriendRequest = () => {
  const [id, setId] = useState('');
  const [accept, setAccept] = useState(undefined);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getRequests = useQuery(getFriendRequestsQ);
  const [acceptRequest] = useMutation(acceptFriendRequestM, {
    variables: {
      accept: accept,
      id: id,
    },
  });

  const onSubmit = async () => {
    try {
      setError(null);

      await acceptRequest({
        variables: {
          accept: accept,
          id: id,
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (getRequests.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {getRequests.data.getFriendRequests !== null ? (
        <>
          {getRequests.data.getFriendRequests.length > 0 ? (
            <>
              {' '}
              <form
                onSubmit={onSubmit}
                className="overflow-y-scroll min-h-[2.7rem] w-full scrollbar-blue pr-2"
              >
                <div className="flex flex-col items-center w-full rounded-lg">
                  {getRequests.data.getFriendRequests.map(
                    (request: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center w-full text-sm text-white bg-indigo-400 rounded-lg font-semibold antialiased pt-2 pb-2 pr-4 pl-4 mb-2"
                      >
                        <h1>{request.incomingUser}</h1>
                        <div className="flex items-center">
                          <button
                            type="submit"
                            className="btn-side bg-green-600 hover:bg-green-700 p-1"
                          >
                            <PlusCircleIcon
                              onClick={() => {
                                setId(request.incomingUserId);
                                setAccept(true);
                              }}
                              className="text-white"
                              height="20"
                              width="30"
                            />
                          </button>
                          <button
                            type="submit"
                            className="btn-side bg-red-600 hover:bg-red-700 p-1 ml-2"
                          >
                            <XCircleIcon
                              onClick={() => {
                                setId(request.incomingUserId);
                                setAccept(false);
                              }}
                              className="text-text"
                              height="20"
                              width="30"
                            />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </form>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};
