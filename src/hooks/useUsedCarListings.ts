import { useEffect, useState } from 'react';
import listingsData from '../data/usedCarLists.json';
import { IUsedCarListing } from '../common/usedCarListing';

export const getUsedCarListings = (userId: string): Promise<IUsedCarListing[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const userListing = listingsData.map(listing => ({ ...listing, userId }));
      resolve(userListing);
    }, Math.floor(Math.random() * 4000) + 1000);
  });
};

const useUserCarListings = (userId: string) => {
  const [listings, setListings] = useState<IUsedCarListing[]>([]);

  useEffect(() => {
    getUsedCarListings(userId).then(data => setListings(data));
  }, [userId]);

  return { listings };
};

export default useUserCarListings;