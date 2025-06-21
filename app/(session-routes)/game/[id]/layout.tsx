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
    <StoreProvider user={user}>
      <div className='h-[calc(100vh - 3em)]'>{children}</div>
    </StoreProvider>
  );
}
