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
      <footer className='flex min-h-[3em] w-full flex-col items-center justify-center p-4'>
        <div className='mb-4 flex items-center justify-center'>
          <Link href='/games' className='text-lg text-white'>
            Games
          </Link>
        </div>
        <div className='flex items-center justify-center'>
          <Logout />
        </div>
      </footer>
    </div>
  );
}
