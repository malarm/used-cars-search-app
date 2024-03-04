import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Header from './Header'

const User: React.FC = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <Header />
      </div>
      <h2>User Information</h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
    </div>
  );
};

export default User;