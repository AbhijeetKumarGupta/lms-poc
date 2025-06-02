// eslint-disable-next-line
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'student' | 'teacher';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: 'student' | 'teacher';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'student' | 'teacher';
  }
}
