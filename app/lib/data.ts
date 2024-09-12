"use server";

import { auth } from "@/auth";

// TODO: remove this after testing suspense
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// export async function getNextSession(){
// let session = {};
// if (typeof window == undefined) {

// } else {

// }
// }

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
    throw new Error("Unable to retrieve token");
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
