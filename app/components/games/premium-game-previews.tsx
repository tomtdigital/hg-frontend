"use server";

import { fetchPremiumGamePreviews } from "@/app/api/data/games";
import Link from "next/link";
import { PreviewLink } from "@/app/components/preview-link";
import { formatDate } from "@/app/utils/format-date";

export default async function PremiumGamePreviews() {
  const games: Fetched<Game[]> = await fetchPremiumGamePreviews();

  return (
    <>
      {games && games?.length > 0 ? (
        <>
          <p>Premium Games</p>
          {games.map((game: Game) => (
            <PreviewLink
              key={game._id}
              className="m-1 bg-purple-500 hover:bg-purple-600"
              href={`/game/${game._id}`}
            >
              <p>{formatDate(game.publishDate)}</p>
            </PreviewLink>
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
