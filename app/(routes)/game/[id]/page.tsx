import { Suspense } from "react";
import Games from "@/app/components/games/games";

export default function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36"></div>
        <p>Game page {id}</p>
      </div>
    </main>
  );
}
