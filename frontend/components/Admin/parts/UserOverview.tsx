import { SearchIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import {
  getOnlineUsers,
  lastTimeOnline,
  registeredFor,
  setOnlineUsers,
} from '../../../pages/api';

export const UserOverview = ({ allUsers }) => {
  useEffect(() => {
    allUsers.map((user) => {
      setOnlineUsers(user.isOnline);
    });
  }, []);

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-col items-start justify-start h-[42.75rem] w-[50rem] bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center w-full justify-between text-white antialiased pt-2 pr-1 pl-1 pb-2">
          <h1 className="font-bold">ADMIN DASHBOARD</h1>
          <h1 className="text-xs">
            Users online:{' '}
            <span className="text-green-500">{getOnlineUsers()}</span>
          </h1>
        </div>
        <div className="flex flex-col items-start justify-start overflow-y-scroll scrollbar-db pr-4">
          <div className="flex items-center justify-between pb-4">
            <input
              type="text"
              placeholder="Search user.."
              className="w-64 bg-gray-600/30 text-xs text-white antialiased outline-none rounded-bl-lg rounded-tl-lg p-2"
            />
            <button className="flex items-center justify-center bg-gray-600/30 rounded-tr-lg rounded-br-lg pl-1 pr-1">
              <SearchIcon className="text-white" height="32" width="21" />
            </button>
          </div>
          {allUsers.map(
            (
              user: {
                username: string;
                id: string;
                date: number;
                lastTimeOnline: number;
                isOnline: boolean;
              },
              index: number
            ) => (
              <div
                key={index}
                className="flex items-center justify-between w-full bg-gray-700 rounded-lg p-3 mb-2 transition duration-500 ease-in-out hover:bg-gray-700/40"
              >
                <h1 className="text-xs antialiased text-white">
                  {user.username}
                </h1>

                <div className="flex items-center justify-between w-[40rem] text-xs antialiased text-white">
                  <h1>{user.id}</h1>
                  <div className="flex items-center">
                    {user.isOnline ? (
                      <span className="text-green-500">online</span>
                    ) : (
                      <h1>
                        Last time online:{' '}
                        <span className="text-green-500">
                          {lastTimeOnline(user.lastTimeOnline)}
                        </span>
                      </h1>
                    )}
                    <button
                      onClick={() => {
                        registeredFor(user.date);
                      }}
                      className="btn-sm bg-yellow-600 text-white text-xs hover:bg-yellow-700 ml-4"
                    >
                      Warn
                    </button>
                    <button className="btn-sm bg-red-700 text-white text-xs hover:bg-red-800 ml-4">
                      Ban
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
