"use server";

import { Session } from "next-auth";
import { getCachedUser } from "./user";

// TODO: remove this after testing suspense
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPremiumGames(): Promise<Fetched<Game[]>> {
  const user: Fetched<Session["user"]> = await getCachedUser();
  const premiumMember: Fetched<boolean> = user?.premium;
  if (premiumMember) {
    try {
      const freeGames = await fetch(
        `${process.env.BACKEND_URL}/games?premium=true`
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
  freeGames: Fetched<Game[]>;
  premiumGames: Fetched<Game[]>;
};

export async function fetchGamePreview(): Promise<Fetched<GamePreviews>> {
  try {
    const games = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/games?premium=false&limit=3`).then(
        (res) => {
          return res.json();
        }
      ),
      fetch(`${process.env.BACKEND_URL}/games?premium=true&limit=3`).then(
        (res) => {
          return res.json();
        }
      ),
    ]).then(
      ([freeGames, premiumGames]: [Fetched<Game[]>, Fetched<Game[]>]) => ({
        freeGames,
        premiumGames,
      })
    );

    return games;
  } catch (error) {}
}
