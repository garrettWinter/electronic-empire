import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "User Name / Password",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const domain = req?.headers?.origin;
        const fetchURL = `${domain}/api/login`;
        console.log(fetchURL); // The URL that the fetch request is being SENT to
        try {
          const res = await fetch(fetchURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          const user = await res.json();
          if (user) {
            console.log('User captured in authorize call:', user);
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    })
  ],
  // Need to uncomment the below pages to when ready to create custom pages.
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    //Attempting to add custom variables to the session.
    async session({ session, token }) {
      // console.log(token); //The token is the data coming into session from the login... Not all values are being stored in session
      session.user.userId = token.userId as string;
      session.user.username = token.username as string;
      session.user.accessToken = token.accessToken as string;
      session.user.accessTokenExpires = token.accessTokenExpires as number
      return session;
    }
  }
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 