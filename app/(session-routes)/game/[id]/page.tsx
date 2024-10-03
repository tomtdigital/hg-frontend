export const dynamic = "force-dynamic";

import { fetchGame } from "@/app/api/data/server/game";
import { getCachedUser } from "@/app/api/data/server/user";
import { Game } from "@/app/components/game";
import StoreProvider from "@/app/store-provider";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");
  const game: Fetched<Game> = await fetchGame(id);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <StoreProvider user={user}>
          <Game game={game} />
        </StoreProvider>
      </div>
    </main>
  );
}
