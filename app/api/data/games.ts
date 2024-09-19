"use server";

import { Session } from "next-auth";
import { getCachedUser } from "./user";
import { redirect } from "next/navigation";

export async function fetchPremiumGames(): Promise<Fetched<GamePreview[]>> {
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");
  const premiumMember: Fetched<boolean> = user?.premium;
  const token: string = user?.token || "";

  if (premiumMember) {
    try {
      const freeGames = await fetch(
        `${process.env.BACKEND_URL}/games?premium=true`,
        { headers: { authorization: `Bearer ${token}` } }
      ).then((res) => {
        return res.json();
      });
      return freeGames;
    } catch (error) {
      throw new Error("Unable to retrieve games");
    }
  } else {
    throw new Error("Incorrect permissions");
  }
}

export type GamePreviews = {
  freeGames: Fetched<GamePreview[]>;
  premiumGames: Fetched<GamePreview[]>;
};

export async function fetchGamePreview(): Promise<Fetched<GamePreviews>> {
  const user: Fetched<Session["user"]> = await getCachedUser();
  if (!user) redirect("/login");
  const token: string = user?.token || "";

  try {
    const games = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/games?premium=false&limit=3`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => {
        return res.json();
      }),
      fetch(`${process.env.BACKEND_URL}/games?premium=true&limit=3`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((res) => {
        return res.json();
      }),
    ]).then(
      ([freeGames, premiumGames]: [
        Fetched<GamePreview[]>,
        Fetched<GamePreview[]>
      ]) => ({
        freeGames,
        premiumGames,
      })
    );

    return games;
  } catch (error) {}
}
