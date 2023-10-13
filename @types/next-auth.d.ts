import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface User {
        /** Define any user-specific variables here to make them available to other code inferences */
        userId: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        // Any other attributes you need from either your User table columns or additional fields during a session callback
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    export interface Session {
        user: User;
    }
}