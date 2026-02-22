import StoreProvider from '@/app/store-provider';

export default async function CreateCrosswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const user: Fetched<Session['user']> = await getCachedUser();
  // if (!user) redirect('/login');
  const user = undefined;
  return (
    <StoreProvider user={user}>
      <div>{children}</div>
    </StoreProvider>
  );
}
