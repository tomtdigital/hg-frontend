export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-lg:h-[calc(100vh-182px)] flex items-center justify-center'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 text-center'>
        {children}
      </div>
    </main>
  );
}
