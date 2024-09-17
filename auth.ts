import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { middlewareAuthConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...middlewareAuthConfig,
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
});
