import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, name: true, image: true, role: true, password: true },
        });

        if (!user || !user.password) return null;
        if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  cookies: {
    sessionToken: {
      name: "kana-admin.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: false },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, role: true },
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
        }
      }

      token.isAdmin =
        token.role === "ADMIN" || token.role === "SUPER_ADMIN";

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.userId as string;
        (session.user as Record<string, unknown>).role = token.role as string;
        (session.user as Record<string, unknown>).isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Credentials provider already validates role in authorize()
      if (account?.provider === "credentials") return true;

      // Google: check DB role
      if (!user.email) return false;
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true },
      });
      if (!dbUser) return false;
      return dbUser.role === "ADMIN" || dbUser.role === "SUPER_ADMIN";
    },
  },
};
