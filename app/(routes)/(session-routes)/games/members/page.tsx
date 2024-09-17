export const dynamic = "force-dynamic";

import { Suspense } from "react";
import MemberGamesPreview from "@/app/components/games/member-games-preview";

export default async function GamePage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <MemberGamesPreview />
    </Suspense>
  );
}
