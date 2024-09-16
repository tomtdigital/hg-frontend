"use server";

import { auth } from "@/auth";

//  Used only on server actions/components
export async function getUser() {
  try {
    const session = await auth();
    const user = session?.user;
    return user;
  } catch (error) {
    throw new Error("Unable to retrieve user");
  }
}
