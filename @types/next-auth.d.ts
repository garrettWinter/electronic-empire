import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface User {
        userId: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        accessToken: string;
        //TODO: Remove below once session is properly working.
        test: string;
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    export interface Session {
        user: User;
    }
}