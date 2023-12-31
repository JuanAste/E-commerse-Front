import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import Auth0Provider from "next-auth/providers/auth0";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   issuer: process.env.AUTH0_ISSUER
    // })
    // Passwordless / email sign in
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      // console.log(session, token, user);
      return {session, user};
      // return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});