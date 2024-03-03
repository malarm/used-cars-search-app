import React from 'react';
import { IUsedCarListing } from '../common/usedCarListing';

interface UsedCarListingProps {
  usedCarListing: IUsedCarListing;
}

const UsedCarListing: React.FC<UsedCarListingProps> = ({ usedCarListing }) => {
  return (
    <div className='w-full flex p-2 my-2 border rounded-1 shadow'>
      <img width={200} height={200} src={usedCarListing.imageUrl} alt="Car" style={{ maxWidth: '100%' }} />
      <div className='p-4'>
        <h2>{usedCarListing.name}</h2>
        <p>Brand: {usedCarListing.brand}</p>
        <p>Year: {usedCarListing.year}</p>
        <p>Price: {usedCarListing.price}</p>
        <p>Kilometers Driven: {usedCarListing.kilometersDriven}</p>
      </div>

    </div>
  );
};

export default UsedCarListing;