"use server";

import { GamePreviews, fetchGamePreviews } from "@/app/api/data/server/games";
import { getCachedUser } from "@/app/api/data/server/user";
import { PreviewLink } from "@/app/components/preview-link";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Session } from "next-auth";
import Link from "next/link";
import { formatDate } from "@/app/utils/format-date";
import { redirect } from "next/navigation";
import { fetchSessionPreviews } from "@/app/api/data/server/game-session";
import { getCompletionStatus } from "@/app/utils/get-completion-status";

export default async function GamesPreview() {
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");
  const premiumMember: boolean = user.premium;
  const gamePreviews: Fetched<GamePreviews> = await fetchGamePreviews();
  const freeGames: Fetched<GamePreview[]> = gamePreviews?.freeGames;
  const premiumGames: Fetched<GamePreview[]> = gamePreviews?.premiumGames;
  const sessionPreviews: Fetched<GameSessionPreview[]> =
    await fetchSessionPreviews();

  return (
    <div className="text-center">
      {freeGames && freeGames?.length > 0 ? (
        <>
          <p>Free</p>
          <div className="w-full flex items-top">
            {freeGames.map((game: GamePreview) => {
              const date = formatDate(game.publishDate);
              const complete: boolean = getCompletionStatus(
                game,
                sessionPreviews
              );
              return (
                <div key={game._id}>
                  <PreviewLink href={`/game/${game._id}`}>{date}</PreviewLink>
                  <span className="block">{complete && "Complete"}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p>No free games detected</p>
        </>
      )}
      {premiumGames && premiumGames?.length > 0 ? (
        <div className="mt-[2em]">
          <span className={clsx({ "flex justify-center": !premiumMember })}>
            <p className={clsx({ "block mr-3": !premiumMember })}>Premium</p>
            {!premiumMember && <LockClosedIcon className="block w-5 max-w-4" />}
          </span>
          <div className="w-full flex items-top">
            {premiumGames.map((game: GamePreview) => {
              const date = formatDate(game.publishDate);
              const complete: boolean = getCompletionStatus(
                game,
                sessionPreviews
              );
              return premiumMember ? (
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
              ) : (
                <span
                  key={game._id}
                  className="m-1 bg-gray-700 text-white block w-[8em] text-center p-4 rounded-[10em]"
                >
                  <p className="block">{date}</p>
                </span>
              );
            })}
          </div>
          <div className="mt-[1em]">
            {premiumMember ? (
              <Link href="/games/premium" className="text-yellow-400">
                View all
              </Link>
            ) : (
              <Link href="/upgrade" className="text-yellow-400">
                Upgrade today!
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          <p>No premium games detected</p>
        </>
      )}
    </div>
  );
}
