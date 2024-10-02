"use server";

import { fetchPremiumGamePreviews } from "@/app/api/data/games";
import Link from "next/link";
import { PreviewLink } from "@/app/components/preview-link";
import { formatDate } from "@/app/utils/format-date";
import { getCompletionStatus } from "@/app/utils/get-completion-status";
import { fetchSessionPreviews } from "@/app/api/data/game-session-client";

export default async function PremiumGamePreviews() {
  const games: Fetched<GamePreview[]> = await fetchPremiumGamePreviews();
  const sessionPreviews: Fetched<GameSessionPreview[]> =
    await fetchSessionPreviews();

  return (
    <>
      {games && games?.length > 0 ? (
        <>
          <p>Premium Games</p>
          {games.map((game: GamePreview) => {
            const date = formatDate(game.publishDate);
            const complete: boolean = getCompletionStatus(
              game,
              sessionPreviews
            );
            return (
              <div key={game._id}>
                <PreviewLink
                  key={game._id}
                  className="bg-purple-500 hover:bg-purple-600"
                  href={`/game/${game._id}`}
                >
                  {date}
                </PreviewLink>
                <span className="block">{complete && "Complete"}</span>
              </div>
            );
          })}
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
