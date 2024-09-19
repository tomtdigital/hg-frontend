"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="text-center text-[2em]">Something went wrong!</h1>
      <Link href="/games" className="text-yellow-400">
        Return to games
      </Link>
    </main>
  );
}
