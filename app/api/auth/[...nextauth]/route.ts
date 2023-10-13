import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from '@/app/lib/prisma';
import { Adapter } from "next-auth/adapters";
import { User } from "@prisma/client";


const handler = NextAuth({
  // *** ISSUE -- The below adapter does not work when uncommented, however this is throught to be needed for custom session variables. However, session.user is empty.
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "account details",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        })

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    //Attempting to add custom variables to the session.
    session({ session, user }) {
      if (user) {
        session.user.userId = (user as User).userId;
        session.user.username = (user as User).username;
        console.log(session)
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST }; 