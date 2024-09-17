import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const body = JSON.stringify(credentials);
        const user = await fetch(`${process.env.BACKEND_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }).then((res) => {
          return res.json();
        });
        if (!user.message) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
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
});
