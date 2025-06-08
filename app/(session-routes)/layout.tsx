export const dynamic = 'force-dynamic';

import Logout from '@/app/components/footer/logout';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import Link from 'next/link';
import { getCachedUser, getUser } from '../api/data/server/user';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Session',
};

export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: Fetched<Session['user']> = await getUser();
  if (!user) redirect('/login');
  console.log('user', user);
  const adminMember: boolean = user?.admin;
  return (
    <div className='min-h-[100vh]'>
      <main className='min-h-[calc(100vh-5em)]'>{children}</main>
      <footer className='flex min-h-[3em] w-full flex-col items-center justify-center p-4'>
        <div className='mb-4 flex items-center justify-center'>
          <Link href='/games' className='text-lg text-white'>
            Games
          </Link>
        </div>
        {adminMember && (
          <div className='mb-4 flex items-center justify-center'>
            <Link href='/create-game' className='text-lg text-white'>
              Create a game
            </Link>
          </div>
        )}
        <div className='flex items-center justify-center'>
          <Logout />
        </div>
      </footer>
    </div>
  );
}
