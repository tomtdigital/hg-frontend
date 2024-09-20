export const dynamic = "force-dynamic";

import { Suspense } from "react";
import GamesPreview from "@/app/components/games/game-previews";

export default async function GamePage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <GamesPreview />
    </Suspense>
  );
}
