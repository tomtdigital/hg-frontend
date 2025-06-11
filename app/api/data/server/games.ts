'use server';

import { Session } from 'next-auth';
import { getCachedUser } from './user';
import { redirect } from 'next/navigation';

export type FetchedPreview = Fetched<GamePreview[]>;

export type GamePreviews = {
  freeGames: Fetched<GamePreview[]>;
  premiumGames: Fetched<GamePreview[]>;
  ownerGames: Fetched<GamePreview[]>;
};

export async function fetchPremiumGamePreviews(): Promise<FetchedPreview> {
  const message = 'Unable to retrieve games';
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  const token: string = user?.token || '';

  if (user?.membership === 'premium') {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/games?access=premium`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message ?? message);
      }
      const premiumGames = await res.json();

      return premiumGames;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : message);
    }
  } else {
    throw new Error('Incorrect permissions');
  }
}

async function fetchPreview(
  access: Access,
  token: string
): Promise<FetchedPreview> {
  const res = await fetch(
    `${process.env.BACKEND_URL}/games?access=${access}&limit=3`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    throw new Error(`Unable to fetch ${access} access games`);
  }
  return res.json();
}

export async function fetchGamePreviews(): Promise<GamePreviews> {
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  const token: string = user?.token || '';

  try {
    const [freeGames, premiumGames, ownerGames]: [
      FetchedPreview,
      FetchedPreview,
      FetchedPreview,
    ] = await Promise.all([
      fetchPreview('free', token),
      fetchPreview('premium', token),
      fetchPreview('owner', token),
    ]);
    return { freeGames, premiumGames, ownerGames };
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Unable to retrieve games'
    );
  }
}
