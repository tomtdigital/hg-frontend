'use server';

import { CreateGameFormData } from '@/app/(session-routes)/grid-previews/components/grid-preview-client';

//  add solution in form!!!
// create  a function to transform form data to game data

export async function createGame(
  data: CreateGameFormData
): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(data);
  let transformedData: Game;

  return { status: 'fulfilled' };

  //   const message = "Failed to create user";
  //   try {
  //     const body = JSON.stringify({
  //       name: formData.get("name"),
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //     });
  //     const res = await fetch(`${process.env.BACKEND_URL}/games`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body,
  //     });

  //     if (!res.ok) {
  //       const error = await res.json();
  //       throw new Error(error.message ?? message);
  //     }
  //   } catch (error: unknown) {
  //     return error instanceof Error ? error.message : message;
  //   }
}
