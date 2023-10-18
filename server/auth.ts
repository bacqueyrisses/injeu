import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { DefaultJWT, JWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
  }
}

export async function getCurrentTeam() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

// @ts-ignore
// @ts-ignore
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "INTEAM" },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          "http://localhost:3000/api/team/findorcreate",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const user = await response.json();
        console.log("authorize" + user.username);
        // If no error and we have user data, return it
        if (response.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      delete session.user.name;
      delete session.user.email;
      delete session.user.image;

      return session;
    },
    async jwt({ token, user, session }) {
      console.log(token, user, session);
      const dbUser = await db.user.findFirst({
        where: {
          id: token.id,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      return {
        id: dbUser.id,
        username: dbUser.username,
      };
    },
  },
};
