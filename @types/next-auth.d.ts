import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface User {
        userId: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        accessToken: string;
        accessTokenExpires: number;
    }

    export interface Session {
        user: User;
    }

    export interface Token {
        userId: string;
        username: string;
        accessToken: string;
    }
}