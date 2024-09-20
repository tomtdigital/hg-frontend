export const dynamic = "force-dynamic";

import { Suspense } from "react";
import PremiumGamesPreview from "@/app/components/games/premium-game-previews";

export default async function GamePage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <PremiumGamesPreview />
    </Suspense>
  );
}
