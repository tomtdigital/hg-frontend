export const dynamic = "force-dynamic";

import { Suspense } from "react";
import PremiumGamesPreview from "@/app/components/games/premium-games-preview";

export default async function GamePage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <PremiumGamesPreview />
    </Suspense>
  );
}
