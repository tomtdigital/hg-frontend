import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { getCachedUser } from '../data/server/user';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const backupErrorMessages = {
  get: 'Unable to get session',
  post: 'Unable to create session',
  put: 'Unable to update session',
};

// Get or create a session on the database
export async function POST(request: Request): Promise<NextResponse> {
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  const reqBody = await request.json();

  try {
    // Check if session exists in the DB
    const getRes = await fetch(
      `${process.env.BACKEND_URL}/game-sessions/${reqBody.game}`,
      {
        headers: { authorization: `Bearer ${user?.token}` },
      }
    );

    if (!getRes.ok) {
      const status = await getRes.status;
      // If there isn't a session found...
      if (status === 404) {
        // ...create one with the data supplied
        try {
          const createRes = await fetch(
            `${process.env.BACKEND_URL}/game-sessions`,
            {
              method: 'POST',
              headers: {
                authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqBody),
            }
          );
          // Handle error for the create
          if (!createRes.ok) {
            const error = await createRes.json();
            throw new Error(error.message ?? backupErrorMessages.post);
          }
          const newDbSession = await getRes.json();
          // Return the createdSession data
          return NextResponse.json(newDbSession);
        } catch (error: unknown) {
          throw new Error(
            error instanceof Error ? error.message : backupErrorMessages.post
          );
        }
      } else {
        // If error with GET aside from 404, throw it
        throw new Error(backupErrorMessages.get);
      }
    }
    const existingDbSession = await getRes.json();
    // Return the existing session
    return NextResponse.json(existingDbSession);
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : backupErrorMessages.get
    );
  }
}

// Update the database session
export async function PUT(request: Request): Promise<NextResponse> {
  //   Check credentials
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  const reqBody = await request.json();
  //   Update the DB Session
  try {
    const updateRes = await fetch(
      `${process.env.BACKEND_URL}/game-sessions/${reqBody.game}`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
        // ...using localStorage
        body: JSON.stringify(reqBody),
      }
    );
    // Handle update error
    if (!updateRes.ok) {
      const error = await updateRes.json();
      throw new Error(error.message ?? backupErrorMessages.put);
    }
    const updatedSession: GameSession = await updateRes.json();
    revalidatePath('/game');
    revalidatePath(`/game/${updatedSession.game}`);
    // return updated response
    return NextResponse.json(updatedSession);
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : backupErrorMessages.put
    );
  }
}
