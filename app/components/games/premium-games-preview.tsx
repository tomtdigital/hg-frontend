"use server";

import { fetchPremiumGames } from "@/app/api/data/games";
import Link from "next/link";

export default async function PremiumGamesPreview() {
  const games: Fetched<Game[]> = await fetchPremiumGames();

  return (
    <>
      {games && games?.length > 0 ? (
        <>
          <p>Premium Games</p>
          {games.map((game: Game) => (
            <Link
              key={game._id}
              className="m-1 bg-purple-500 text-black block w-full"
              href={`/game/${game._id}`}
            >
              <p>{game.publishDate}</p>
            </Link>
          ))}
        </>
      ) : (
        <>
          <p>No games detected</p>
        </>
      )}
      <Link href="/games" className="text-purple-400">
        Back to games
      </Link>
    </>
  );
}
