import { auth } from "@/auth";
import { cache } from "react";

// TODO: remove this after testing suspense
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//  Used only on server actions/components
export async function getUser() {
  try {
    const session = await auth();
    const user = !!session?.user;
    return user;
  } catch (error) {
    throw new Error("Unable to retrieve user");
  }
}

//  Used only on server actions/components
export async function getBackendToken() {
  try {
    const session = await auth();
    const token = !!session?.user?.token;
    return token;
  } catch (error) {
    throw new Error("Unable to retrieve user");
  }
}

export async function fetchGames() {
  const token = await getBackendToken();
  try {
    const games = await fetch(`${process.env.BACKEND_URL}/games/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
    return games;
  } catch (error) {}
}
