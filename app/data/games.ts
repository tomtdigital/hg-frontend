"use server";

import { getUser } from "./user";

// TODO: remove this after testing suspense
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMemberGames(): Promise<Fetched<Game[]>> {
  const user = await getUser();
  const member: Fetched<boolean> = user?.member;
  if (member) {
    try {
      const freeGames = await fetch(
        `${process.env.BACKEND_URL}/games?member=true`
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
  paidGames: Fetched<Game[]>;
};

export async function fetchGamePreview(): Promise<Fetched<GamePreviews>> {
  try {
    const games = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/games?member=false&limit=3`).then(
        (res) => {
          return res.json();
        }
      ),
      fetch(`${process.env.BACKEND_URL}/games?member=true&limit=3`).then(
        (res) => {
          return res.json();
        }
      ),
    ]).then(([freeGames, paidGames]: [Fetched<Game[]>, Fetched<Game[]>]) => ({
      freeGames,
      paidGames,
    }));

    return games;
  } catch (error) {}
}
