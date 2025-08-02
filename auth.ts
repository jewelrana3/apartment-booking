import * as bcrypt from "bcrypt-ts";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./database/mongoClientPromise";
import Credentials from "next-auth/providers/credentials";
import { userModal } from "./models/user-model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIROMENT,
  }),

  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = await userModal.findOne({ email: credentials.email });
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (user) {
            if (isMatch) {
              return user;
            } else {
              throw new Error("email and password not match");
            }
          } else {
            throw new Error("user not found");
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
