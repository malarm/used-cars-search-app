import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchListingById } from '../hooks/useUsedCarListingById';
import Header from './Header';

const ListingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: listing } = useQuery(['listing', id], () => fetchListingById(id ?? ''));

    if (!listing) {
        return <div className='flex justify-center font-extrabold my-2'>Loading...</div>;
    }

    return (<div>
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <Header />
        </div>
        {listing ?
            <div className="container mx-auto p-8">
                <Link to="/listings" className="text-blue-500 hover:underline mb-4 block">
                    Back to Listings
                </Link>
                <h1 className="text-3xl font-semibold mb-4">{listing.name}</h1>
                <div className='flex'>
                    <div className="mb-4">
                        <img src={listing.imageUrl} alt={listing.name} width={600} height={'auto'} />
                    </div>
                    <div className='p-5 justify-between'>
                        <p><strong>Brand:</strong> {listing.brand}</p>
                        <p><strong>Year:</strong> {listing.year}</p>
                        <p><strong>Price:</strong> ${listing.price}</p>
                        <p><strong>Kilometers Driven:</strong> {listing.kilometersDriven} km</p>
                    </div>
                </div>
            </div> :
            <div>Invalid Page</div>
        }
    </div>
    );
};

export default ListingDetail;