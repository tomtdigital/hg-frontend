'use client';

import { loginUser } from '@/app/api/actions/user';
import { Button } from '@/app/components/button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { useActionState } from 'react';

export default function LoginForm() {
  const initialState: string = '';
  const [errorMessage, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  return (
    <form action={formAction}>
      <h1 className='mb-3 text-2xl'>Please log in to continue.</h1>
      <div className='w-full'>
        <div>
          <label
            className='mb-3 mt-5 block text-xs font-medium'
            htmlFor='email'
          >
            Email
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-gray-700 outline-2 placeholder:text-gray-500'
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email address'
              required
            />
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
        </div>
        <div className='mt-4'>
          <label
            className='mb-3 mt-5 block text-xs font-medium'
            htmlFor='password'
          >
            Password
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-gray-700 outline-2 placeholder:text-gray-500'
              id='password'
              type='password'
              name='password'
              placeholder='Enter password'
              required
              minLength={6}
            />
            <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
        </div>
      </div>
      <Button
        className='mt-4 bg-yellow-400 text-center text-black hover:bg-yellow-500'
        aria-disabled={isPending}
      >
        Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-black' />
      </Button>
      <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
