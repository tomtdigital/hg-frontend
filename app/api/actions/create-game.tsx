'use server';

import { CreateGameFormData } from '@/app/(session-routes)/create-game/form';
import { transformToApi } from '../transforms/create-game';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { getCachedUser } from '../data/server/user';

export async function createGame(
  data: CreateGameFormData
): Promise<ActionState> {
  // Ensure the user is authenticated
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  if (!user.roles?.includes('admin')) {
    return {
      status: 'rejected',
      error: { message: 'You do not have permission to create a game.' },
    };
  }

  // TODO: Validate the form data

  // Transform the form data to the API format
  const transformedData: NewGame = transformToApi(data);
  const body = JSON.stringify(transformedData);
  let err = false;
  let status = 200;
  let message = 'Failed to create game';

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const error = await res.json();
      status = res.status;
      throw new Error(error.message ?? message);
    }
    return {
      status: 'fulfilled',
    };
  } catch (error: unknown) {
    err = true;
    if (status === 409)
      message = `A game with ${transformedData.access} access already exists on this date!`;
    return { status: 'rejected', error: { message } };
  } finally {
    if (!err) {
      redirect('/games');
    }
  }
}
