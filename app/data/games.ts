"use server";

// TODO: remove this after testing suspense
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchGames(
  member: boolean = false
): Promise<Fetched<Game[]>> {
  try {
    const freeGames = await fetch(
      `${process.env.BACKEND_URL}/games?member=${member}`
    ).then((res) => {
      return res.json();
    });
    return freeGames;
  } catch (error) {
    throw new Error("Unable to retrieve games");
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
