export const dynamic = 'force-dynamic';

import { getCachedUser } from '@/app/api/data/server/user';
import StoreProvider from '@/app/store-provider';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');

  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <StoreProvider user={user}>{children}</StoreProvider>
      </div>
    </main>
  );
}
