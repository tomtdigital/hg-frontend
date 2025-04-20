import Logout from '@/app/components/footer/logout';
import '@/app/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'User Session',
};

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-[100vh]'>
      <main className='min-h-[calc(100vh-5em)]'>{children}</main>
      <footer className='flex min-h-[3em] w-[100%] flex-col items-center justify-center bg-gray-900 p-[1em] md:flex-row md:p-[2em]'>
        <div className='mb-[1em] md:mb-0 md:mr-[3em]'>
          <Link href='/games' className='text-white'>
            Games
          </Link>
        </div>
        <div>
          <Logout />
        </div>
      </footer>
    </div>
  );
}
