'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const Error = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 text-center border">
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Oops!
        </h1>

        <p className="mt-3 text-gray-600">
          Something went wrong. Please try again or refresh the page.
        </p>

        {error?.message && (
          <p className="mt-2 text-sm text-red-500">
            {error.message}
          </p>
        )}

        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
        <Link href='/' className="mt-6 inline-flex items-center gap-2 bg-transparent border border-black font-semi-bold ml-4 text-red px-5 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition">Back To Home</Link>
      </div>
    </div>
  );
};

export default Error;