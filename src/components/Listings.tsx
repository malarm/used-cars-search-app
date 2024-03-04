import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import Listing from './Listing';
import { AppContext } from '../context/AppContext';
import { getListings } from '../hooks/useUsedCarListings';
import { Link } from 'react-router-dom';


const Listings: React.FC = () => {
  const { user } = useContext(AppContext);
  const { data: listings } = useQuery('listings', () => getListings(user?.id || ''));

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [minYearFilter, setMinYearFilter] = useState<number>(2000);
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const [minKilometersFilter, setMinKilometersFilter] = useState<number>(0);
  const [maxYearFilter, setMaxYearFilter] = useState<number>(2024);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(100000);
  const [maxKilometersFilter, setMaxKilometersFilter] = useState<number>(500000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listingsPerPage, setListingsPerPage] = useState<number>(10);

  if (!listings) {
    return <div className='flex justify-center font-extrabold my-2'>Loading...</div>;
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
    listing.year >= minYearFilter && listing.year <= maxYearFilter &&
    listing.price >= minPriceFilter && listing.price <= maxPriceFilter &&
    listing.kilometersDriven >= minKilometersFilter && listing.kilometersDriven <= maxKilometersFilter
  );

  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleResetClick = () => {
    setBrandFilters([]);
    setMinYearFilter(2000);
    setMinPriceFilter(0);
    setMinKilometersFilter(0);
    setMaxYearFilter(2024);
    setMaxPriceFilter(100000);
    setMaxKilometersFilter(500000);
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Used Cars</h1>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:text-gray-400 text-base">Home</a>
          <a href="/listings" className="hover:text-gray-400 text-base">Listings</a>
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
        <div className='flex-none' style={{ width: 250 }}>
          <div><button className='mx-5 my-3 px-3 py-1 border bg-gray-100' onClick={handleResetClick}>Reset</button></div>
          <div className='px-2 py-2 mb-3'>
            <label className='fw-bo'>Brand: </label>
            <div className='pl-3 overflow-auto' style={{ maxHeight: 'calc(100vh - 400px)' }}>
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
          <div className='mb-3'>
            <label htmlFor="year">Year: </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Min"
                value={minYearFilter}
                onChange={(e) => setMinYearFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2 mr-2"
              />
              <div className='p-2'>to</div>
              <input
                type="text"
                placeholder="Max"
                value={maxYearFilter}
                onChange={(e) => setMaxYearFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor="price">Price Range:</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Min"
                value={minPriceFilter}
                onChange={(e) => setMinPriceFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2 mr-2"
              />
              <div className='p-2'>to</div>
              <input
                type="text"
                placeholder="Max"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="kilometers">Kilometers Range:</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Min"
                value={minKilometersFilter}
                onChange={(e) => setMinKilometersFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2 mr-2 mb-2"
              />
              <div className='p-2'>to</div>
              <input
                type="text"
                placeholder="Max"
                value={maxKilometersFilter}
                onChange={(e) => setMaxKilometersFilter(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
                className="w-1/2 border rounded px-3 py-2 mb-2"
              />
            </div>

          </div>
        </div>
        <div className='flex-grow' >
          <div>
            {totalPages > 0 && (
              <div className='flex'>
                <div className='m-4 '>
                  <label>Page options :</label>
                  <select onChange={(e) => setListingsPerPage(e.target.value !== '' ? parseFloat(e.target.value) : 10)} value={listingsPerPage}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                    <option>150</option>
                  </select>
                </div>
                <div className="flex flex-grow justify-end m-4">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='overflow-auto' style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {
              filteredListings.length === 0 && <p className='flex justify-center font-bold m-6'>No Car listing available</p>
            }
            {filteredListings.slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage).map(listing => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="block mb-4">
                <Listing key={listing.id} listing={listing} />
              </Link>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Listings;
