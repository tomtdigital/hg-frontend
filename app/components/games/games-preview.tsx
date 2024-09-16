"use server";

import { GamePreviews, fetchGamePreview } from "@/app/data/games";
import { getUser } from "@/app/data/user";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import Link from "next/link";

export default async function GamesPreview() {
  const user: Fetched<Session["user"]> = await getUser();
  const member: Fetched<boolean> = user?.member;
  const gamePreviews: Fetched<GamePreviews> = await fetchGamePreview();
  const freeGames: Fetched<Game[]> = gamePreviews?.freeGames;
  const paidGames: Fetched<Game[]> = gamePreviews?.paidGames;

  return (
    <>
      {freeGames && freeGames?.length > 0 ? (
        <>
          <p>Free Games</p>
          {freeGames.map((game: Game) => (
            <Link
              key={game._id}
              className="m-1 bg-yellow-500 text-black block w-full"
              href={`/game/${game._id}`}
            >
              <p>{game.publishDate}</p>
            </Link>
          ))}
        </>
      ) : (
        <>
          <p>No free games detected</p>
        </>
      )}
      {paidGames && paidGames?.length > 0 ? (
        <>
          <p>
            Member Games{" "}
            {member && (
              <Link href="/games/members" className="text-purple-400">
                (see all)
              </Link>
            )}
          </p>
          {paidGames.map((game: Game) =>
            member ? (
              <Link
                key={game._id}
                className="m-1 bg-purple-500 text-black block w-full"
                href={`/game/${game._id}`}
              >
                <span className="flex justify-between">
                  <p className="block">{game.publishDate}</p>
                </span>
              </Link>
            ) : (
              <span
                key={game._id}
                className="m-1 bg-gray-500 text-black flex justify-between w-full"
              >
                <p className="block">{game.publishDate}</p>
                <LockClosedIcon className="block w-5 max-w-4" />
              </span>
            )
          )}
        </>
      ) : (
        <>
          <p>No member games detected</p>
        </>
      )}
    </>
  );
}
