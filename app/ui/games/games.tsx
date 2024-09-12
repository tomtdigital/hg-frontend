"use server";

import { fetchGames } from "@/app/lib/data";
import Link from "next/link";

export default async function Games() {
  const games: Game[] = await fetchGames();
  return (
    <>
      {games?.length > 0 ? (
        <>
          {games.map((game: Game) => (
            <Link
              key={game._id}
              className="m-1 bg-yellow-500 text-black block"
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
      <p>Games component</p>
    </>
  );
}
