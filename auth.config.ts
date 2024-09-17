import type { NextAuthConfig } from "next-auth";

export const middlewareAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Lifted from main config for authorized callback
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // Lifted from main config for authorized callback
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname === "/";
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      // Basic redirect for login if anywhere but homepage and not logged in
      if (!isLoggedIn && !isOnHome) {
        return false;
        // Redirect to games if signed in and on home/login
      } else if ((isOnLogin || isOnHome) && isLoggedIn) {
        return Response.redirect(new URL("/games", nextUrl));
      }

      // Redirect to a sign up page for non-members on protected routes
      const isMember = auth?.user?.member;
      const isOnMembers = nextUrl.pathname.endsWith("/members");
      if (isOnMembers) {
        if (isMember) {
          return true;
        } else {
          return Response.redirect(new URL("/sign-up", nextUrl));
        }
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
