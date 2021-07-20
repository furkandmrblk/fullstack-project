import { useQuery } from '@apollo/client';
import React from 'react';
import { getCurrentUserQ } from '../../graphql/Queries';
import { Navbar } from '../Auth/Navbar';
import { CreateNews } from './parts/CreateNews';
import { UserOverview } from './parts/UserOverview';

export const Dashboard = ({ users }) => {
  if (users.loading) {
    return <p>Loading...</p>;
  }

  const allUsers = users.data.getUsers;

  const currentUser = useQuery(getCurrentUserQ);
  if (currentUser.loading) return <p>Loading...</p>;

  const userIsAdmin = currentUser.data.getCurrentUser.isAdmin;

  if (!userIsAdmin) {
    throw Error('No permission to enter this page!');
  }

  return (
    <div className="flex max-w-full h-[91vh]">
      <Navbar />
      <div className="flex items-center justify-center h-[91.1vh] w-[100vw] bg-gray-900 mt-[5.235rem]">
        <div className="flex flex-col items-start justify-start h-[85vh] w-[95vw] rounded-lg bg-gray-900 border-gray-500 border-2">
          <div className="flex items-start justify-between w-full">
            <UserOverview allUsers={allUsers} />
            <CreateNews />
          </div>
        </div>
      </div>
    </div>
  );
};
