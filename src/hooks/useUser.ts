import { useEffect, useState } from 'react';
import userData from '../data/user.json';
import { IUser } from '../common/user';

export const getUser = (): Promise<IUser | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userData);
    }, Math.floor(Math.random() * 4000) + 1000);
  });
};

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUser().then(data => setUser(data));
  }, []);

  return { user };
};

export default useUser;
