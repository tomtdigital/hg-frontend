'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='h-[calc(100vh - 3em)] p-8'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Something went wrong</h1>
        <p className='mb-4'>
          We're sorry, but an unexpected error has occurred.
        </p>
      </div>
      <div className='mx-auto w-[20em]'>
        <p className=''>You can try the following:</p>
        <ul className='list-inside list-disc'>
          <li>Refresh the page</li>
          <li>Clear site storage</li>
          <li>
            <Link href='/' className='text-blue-600 hover:underline'>
              Go back to the homepage
            </Link>
          </li>
        </ul>
      </div>
      <div className='text-center'>
        <button
          className='mt-6 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'
          onClick={() => {
            Object.keys(localStorage)
              .filter((key) => key.startsWith('hg-'))
              .forEach((key) => localStorage.removeItem(key));
          }}
        >
          Clear Site Storage
        </button>
      </div>
    </div>
  );
}
