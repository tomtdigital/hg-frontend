// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

type Role = 'user' | 'admin' | 'owner';
type Membership = 'free' | 'premium';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      membership: Membership;
      roles: Role[];
    };
  }

  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      membership: Membership;
      roles: Role[];
    };
  }
}
