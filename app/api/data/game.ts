"use server";

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getCachedUser } from "./user";

export async function fetchGame(id: string): Promise<Fetched<Game> | object> {
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");
  let statusCode;

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/games/${id}`, {
      headers: { authorization: `Bearer ${user?.token}` },
    });
    statusCode = await res.status;
    const game = await res.json();
    if (!game.message) {
      return game;
    }
  } catch (error) {
    throw new Error("Unable to retrieve game");
  } finally {
    switch (statusCode) {
      case 400 || 500:
        throw new Error("Unable to retrieve game");
      case 403:
        redirect("/upgrade");
      case 404:
        redirect("/not-found");
      default:
        break;
    }
  }
}
