export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <p>Games Layout</p>
        <div className="border-2 border-solid border-gray-400 p-2">
          {children}
        </div>
      </div>
    </main>
  );
}
