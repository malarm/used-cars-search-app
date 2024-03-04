import React from 'react';
import { IListing } from '../common/usedCarListing';

interface ListingProps {
  listing: IListing;
}

const Listing: React.FC<ListingProps> = ({ listing }) => {
  return (
    <div className='w-full flex p-2 my-2 border rounded-1 shadow'>
      <img width={200} height={200} src={listing.imageUrl} alt="Car" style={{ maxWidth: '100%' }} />
      <div className='p-4'>
        <h2>{listing.name}</h2>
        <p>Brand: {listing.brand}</p>
        <p>Year: {listing.year}</p>
        <p>Price: {listing.price}</p>
        <p>Kilometers Driven: {listing.kilometersDriven}</p>
      </div>
    </div>
  );
};

export default Listing;