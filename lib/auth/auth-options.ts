import { db } from "@/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { loginSchema } from "@/shema/auth/auth-schema";

const emailProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: {},
    password: {},
  },
  async authorize(credentials) {
    console.log("Inside credentials provider");
    const { username, password } = credentials!;
    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      throw new Error("Invalid input");
    }

    try {
      const user = await db.user.findUnique({
        where: { username: result.data.username.toLowerCase(), verified: true },
      });

      if (!user || !(await compare(result.data.password, user.password))) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    emailProvider,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      console.log("JWT Callback:", { trigger, session });

      if (user) {
        token.uid = user.id;
        token.username = user.username;
        token.email = user.email;
      }

      // Handle session update in JWT
      if (trigger === "update" && session) {
        console.log("JWT Update:", session);
        // Update token with new session data
        token.email = session.user?.email;
        token.username = session.user?.name;
      }

      return token;
    },
    session: async ({ session, token, trigger, newSession }) => {
      console.log("Session Callback:", { trigger, newSession });

      console.log({ token, session }, "token and session");
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.name = token.username as string;
      }

      // // Handle session update
      // if (trigger === "update") {
      //   console.log("Session Update triggered");
      //   // Get the latest user data from the database
      //   const user = await db.user.findUnique({
      //     where: { id: session.user.id },
      //   });

      //   if (user) {
      //     // Update the session with the latest data
      //     session.user = {
      //       ...session.user,
      //       email: user.email,
      //       name: user.username,
      //     };
      //   }
      // }

      return session;
    },
    async signIn({ user, account }) {
      if (account && account.provider === "google" && user) {
        const userData = await db.user.findUnique({
          where: { email: user.email?.toLowerCase(), verified: true },
        });
        const hashedPassword = await bcrypt.hash(user.email!, 10);

        if (!userData) {
          const newUser = await db.user.create({
            data: {
              username: user.name!,
              email: user.email!.toLowerCase(),
              password: hashedPassword,
              verified: true,
              imageUrl: user.image,
            },
          });
          if (newUser) {
            user.id = newUser.id;
            user.image = newUser.imageUrl;
            return true;
          }
        }
        if (userData && (await compare(user.email!, userData.password))) {
          user.id = userData.id;
          user.image = userData.imageUrl;
          return true;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

export default NextAuth(authOptions);
