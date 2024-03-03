import React, { createContext, FC, ReactNode, useState } from 'react';
import userData from '../data/user.json';
import { IUser } from '../common/user';

interface AppContextProps {
  user: IUser | null;
}

export const AppContext = createContext<AppContextProps>({ user: null });

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [user] = useState<IUser | null>(userData);

  return (
    <AppContext.Provider value={{ user }}>
      {children}
    </AppContext.Provider>
  );
};
