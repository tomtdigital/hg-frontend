"use server";

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getCachedUser } from "./user";

export async function fetchSessionPreviews(): Promise<
  Fetched<GameSessionPreview[]>
> {
  const message = "Unable to retrieve sessions";
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/game-sessions/`, {
      headers: { authorization: `Bearer ${user?.token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? message);
    }

    return await res.json();
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : message);
  }
}
