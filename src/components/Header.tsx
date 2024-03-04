import React from 'react'

const Header = () => {
    return (
        <>
            <h1 className="text-xl font-bold">Used Cars</h1>
            <div className="flex items-center space-x-4">
                <a href="/" className="hover:text-gray-400 text-base">Home</a>
                <a href="/listings" className="hover:text-gray-400 text-base">Listings</a>
            </div>
        </>
    )
}
export default Header