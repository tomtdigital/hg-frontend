"use server";

import {
  GamePreviews,
  fetchGamePreview,
  fetchMemberGames,
} from "@/app/data/games";
import { getUser } from "@/app/data/user";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import Link from "next/link";

export default async function MemberGamesPreview() {
  const user: Fetched<Session["user"]> = await getUser();
  const games: Fetched<Game[]> = await fetchMemberGames();

  return (
    <>
      {games && games?.length > 0 ? (
        <>
          <p>Member Games</p>
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
