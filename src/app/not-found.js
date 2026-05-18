import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex justify-center items-center flex-col h-[70vh] space-y-2'>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Go Back
            </Link>
        </div>
    );
};

export default NotFound;