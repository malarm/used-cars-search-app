import { useQuery } from 'react-query';
import listingsData from '../data/usedCarLists.json';
import { IListing } from '../common/usedCarListing';

export const fetchListingById = async (id: string): Promise<IListing> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const userListing = listingsData.find(listing => ({ ...listing, id }));
      if (userListing) {
        resolve(userListing);
      }
      else {
        Promise.reject("no data")
      }
    }, Math.floor(Math.random() * 4000) + 1000);
  });
};

const useListingById = (id: string) => {
  return useQuery(['listing', id], () => fetchListingById(id));
};

export default useListingById;