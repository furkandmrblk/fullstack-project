import React, { useState } from 'react';
import { UserAddIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { sendFriendRequestM } from '../../../../graphql/Mutations';

export const Input = ({ props }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [sendRequest] = useMutation(sendFriendRequestM, {
    variables: {
      username: username,
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError(null);

      await sendRequest({
        variables: {
          username: username,
        },
      });

      setSuccess(`Successfully send friend request to ${username}.`);
      setUsername('');
      setTimeout(() => {
        setSuccess(null);
      }, 2500);
    } catch (error) {
      setSuccess(null);
      setError(error.message);
      setUsername('');
      setTimeout(() => {
        setError(null);
      }, 2500);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between bg-white rounded-lg pt-2 pb-2 pr-4 pl-4 mb-2">
          <input
            className="text-sm text-black flex items-center justify-start bg-white rounded-lg outline-none w-[13.75rem]"
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            placeholder={props.placeholder}
            autoComplete="off"
          />
          {props.icon === 'friendlist' ? (
            <button type="submit" className="flex items-center justify-center">
              <UserAddIcon className="text-indigo-900 h-5 w-5 cursor-pointer" />
            </button>
          ) : (
            <PlusCircleIcon className="text-indigo-900 h-5 w-5 cursor-pointer" />
          )}
        </div>
      </form>
      {error ? (
        <>
          <h1 className="text-xs text-white antialiased bg-red-500 rounded-lg pt-1 pb-1 pr-4 pl-4">
            {error}
          </h1>
        </>
      ) : null}
      {success ? (
        <>
          <h1 className="text-xs text-white antialiased bg-green-500 rounded-lg pt-1 pb-1 pr-4 pl-4">
            {success}
          </h1>
        </>
      ) : null}
    </div>
  );
};
