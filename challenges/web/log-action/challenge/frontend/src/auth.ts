import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "next-auth";
import { authConfig } from "@/auth.config";
import { randomBytes } from "crypto";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          // Using a one-time password is more secure
          if (username === "admin" && password === randomBytes(16).toString("hex")) {
            return {
              username: "admin",
            } as User;
          }
        }
        throw new CredentialsSignin;
      },
    }),
  ]
});