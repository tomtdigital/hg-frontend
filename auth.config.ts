import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnGame = nextUrl.pathname.startsWith("/games");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnHome = nextUrl.pathname === "/";
      if (isOnGame) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if ((isOnLogin || isOnHome) && isLoggedIn) {
        return Response.redirect(new URL("/games", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;