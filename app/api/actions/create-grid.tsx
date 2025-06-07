'use server';

import { FormValues } from '@/app/(session-routes)/grid-previews/components/grid-preview-client';

export async function createGrid(data: FormValues): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(data);
  return { status: 'fulfilled' };
}
