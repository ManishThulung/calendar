import { type UserSessionFromDB } from "@/lib/functions/sessionUpdateTimeCache";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    email: string;
    image?: string;
  }

  // interface JWT {
  //   uid: string;
  //   username?: string;
  //   email?: string;
  //   image?: string;
  // }
}
