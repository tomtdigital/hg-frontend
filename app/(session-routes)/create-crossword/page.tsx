import StoreProvider from '@/app/store-provider';
import GridCreator from './components/grid-creator';
// import { getCachedUser } from '@/app/api/data/server/user';
// import { redirect } from 'next/navigation';
// import { Session } from 'next-auth';

export default async function CreateCrossword() {
  //   const user: Fetched<Session['user']> = await getCachedUser();
  // if (!user) redirect('/login');
  const user = undefined;

  return (
    <StoreProvider user={user}>
      <GridCreator />
    </StoreProvider>
  );
}
