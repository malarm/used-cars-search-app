import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import UsedCarListing from './UsedCarListing';
import { AppContext } from '../context/AppContext';
import { getUsedCarListings } from '../hooks/useUsedCarListings';

const UsedCarListings: React.FC = () => {
  const { user } = useContext(AppContext);
  const { data: listings } = useQuery('listings', () => getUsedCarListings(user?.id || ''));

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<number[]>([2000, 2024]);
  const [priceFilter, setPriceFilter] = useState<number[]>([0, 100000]);
  const [kilometersFilter, setKilometersFilter] = useState<number[]>([0, 500000]);

  if (!listings) {
    return <div>Loading...</div>;
  }

  const availableBrands = Array.from(new Set(listings.map(listing => listing.brand)));

  const handleBrandFilterChange = (brand: string) => {
    const updatedFilters = brandFilters.includes(brand)
      ? brandFilters.filter(item => item !== brand)
      : [...brandFilters, brand];

    setBrandFilters(updatedFilters);
  };

  const isBrandSelected = (brand: string) => brandFilters.includes(brand);

  const filteredListings = listings.filter(listing =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (brandFilters.length === 0 || brandFilters.includes(listing.brand)) &&
    listing.year >= yearFilter[0] && listing.year <= yearFilter[1] &&
    listing.price >= priceFilter[0] && listing.price <= priceFilter[1] &&
    listing.kilometersDriven >= kilometersFilter[0] && listing.kilometersDriven <= kilometersFilter[1]
  );

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Used Cars</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="rounded-full pl-8 py-2 text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              placeholder="Search..."
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='flex w-full'>
        <div className='flex-none'>
          <div className='px-2 py-2'>
            <label className='fw-bo'>Brand: </label>
            <div className='pl-3 overflow-auto'  style={{maxHeight: 'calc(100vh - 350px)'}}>
              {availableBrands.map(brand => (
                <p > <label key={brand}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={isBrandSelected(brand)}
                    onChange={() => handleBrandFilterChange(brand)}
                  />
                  <span className='ml-3'>{brand}</span>
                </label></p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="year">Year Range: {yearFilter[0]} - {yearFilter[1]}</label>
            <div className='p-2'>
              <input
                type="range"
                id="year"
                min={2000}
                max={2024}
                value={yearFilter[1]}
                onChange={(e) => setYearFilter([yearFilter[0], parseInt(e.target.value, 10)])}
              />
            </div>
          </div>
          <div>
            <label htmlFor="price">Price Range: {priceFilter[0]} - {priceFilter[1]}</label>
            <div className='p-2'>
              <input
                type="range"
                id="price"
                min={0}
                max={100000}
                value={priceFilter[1]}
                onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value, 10)])}
              />
            </div>
          </div>
          <div>
            <label htmlFor="kilometers">Kilometers Range: {kilometersFilter[0]} - {kilometersFilter[1]}</label>
            <div className='p-2'>
              <input
                type="range"
                id="kilometers"
                min={0}
                max={500000}
                value={kilometersFilter[1]}
                onChange={(e) => setKilometersFilter([kilometersFilter[0], parseInt(e.target.value, 10)])}
              />

            </div>
          </div>
        </div>
        <div className='flex-grow overflow-auto' style={{maxHeight: 'calc(100vh - 100px)'}}>
          {filteredListings.map(listing => (
            <UsedCarListing key={listing.id} usedCarListing={listing} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default UsedCarListings;
