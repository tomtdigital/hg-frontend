export const dynamic = 'force-dynamic';

import Logout from '@/app/components/footer/logout';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import Link from 'next/link';
import { getCachedUser } from '../api/data/server/user';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Session',
};

export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user: Fetched<Session['user']> = await getCachedUser();
  // if (!user) redirect('/login');
  // const adminMember: boolean = user?.roles?.includes('admin') || false;
  return (
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <main>{children}</main>
      <footer className='flex min-h-[3em] w-full flex-col items-center justify-center'>
        <div className='flex w-full items-center justify-center border-b-2 border-darkGrey py-4'>
          <Link href='/games' className='block text-lg'>
            Games
          </Link>
        </div>
        {/* {adminMember && (
          <div className='flex w-full items-center justify-center border-b-2 border-darkGrey py-4'>
            <Link href='/create-game' className='block text-lg'>
              Create a game
            </Link>
          </div>
        )} */}
        {/* {adminMember && ( */}
        <div className='flex w-full items-center justify-center border-b-2 border-darkGrey py-4'>
          <Link href='/create-crossword' className='block text-lg'>
            Create a crossword
          </Link>
        </div>
        {/* })} */}
        <div className='flex w-full items-center justify-center border-b-2 border-darkGrey py-4'>
          <Logout />
        </div>
      </footer>
    </div>
  );
}
