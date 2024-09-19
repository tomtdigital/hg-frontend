import { fetchGame } from "@/app/api/data/game";

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const game = await fetchGame(id);
  console.log(game);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <p>Game page {id}</p>
      </div>
    </main>
  );
}
