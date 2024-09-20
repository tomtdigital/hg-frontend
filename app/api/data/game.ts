"use server";

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getCachedUser } from "./user";

export async function fetchGame(id: string): Promise<Fetched<Game> | object> {
  let statusCode;
  const message = "Unable to rerieve game";
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/games/${id}`, {
      headers: { authorization: `Bearer ${user?.token}` },
    });

    if (!res.ok) {
      statusCode = await res.status;
      const error = await res.json();
      throw new Error(error.message ?? message);
    }

    return await res.json();
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : message);
  } finally {
    switch (statusCode) {
      case 403:
        redirect("/upgrade");
      case 404:
        redirect("/not-found");
      default:
        break;
    }
  }
}
