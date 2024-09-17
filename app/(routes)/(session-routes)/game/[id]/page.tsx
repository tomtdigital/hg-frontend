export default function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="border-2 border-solid border-gray">
          <p>Game page {id}</p>
        </div>
      </div>
    </main>
  );
}