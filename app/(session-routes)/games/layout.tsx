export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 text-center md:-mt-32'>
        <h1 className='text-2xl font-bold'>Latest Games</h1>
        {children}
      </div>
    </main>
  );
}
