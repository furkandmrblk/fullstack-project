import { useQuery } from '@apollo/client';
import { Dashboard } from '../components/Admin/Dashboard';
import { getUsersQ } from '../graphql/Queries';

export default function AdminDashboard() {
  const getAllUsers = useQuery(getUsersQ);

  return (
    <>
      <Dashboard users={getAllUsers} />
    </>
  );
}
