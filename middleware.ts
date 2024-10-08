// export { auth as middleware } from "@/auth";

import NextAuth from "next-auth";
import { middlewareAuthConfig } from "./auth.config";

export default NextAuth(middlewareAuthConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
