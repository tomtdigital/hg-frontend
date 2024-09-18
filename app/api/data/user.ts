"use server";

import { auth } from "@/auth";
import { Session } from "next-auth";
import { cache } from "react";

//  Used only on server actions/components
export async function getUser(): Promise<Fetched<Session["user"]>> {
  try {
    const session = await auth();
    const user = session?.user;
    return user;
  } catch (error) {
    throw new Error("Unable to retrieve user");
  }
}

export const getCachedUser: typeof getUser = cache(async () => await getUser());
