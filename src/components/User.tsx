import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const User: React.FC = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
    </div>
  );
};

export default User;