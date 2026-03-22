import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const { data } = await res.json();
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          image: data.user.image,
          role: data.user.role,
          accessToken: data.token,
        } as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Google OAuth — first sign-in: sync with backend to get DB user ID + backend JWT
      if (account?.provider === "google" && user) {
        token.googleEmail = user.email;
        token.googleName = user.name;
        token.googleImage = user.image;
        token.googleProviderAccountId = account.providerAccountId;
      }

      // Credentials login
      if (account?.provider === "credentials" && user) {
        token.userId = user.id;
        token.role = (user as any).role ?? "CUSTOMER";
        token.accessToken = (user as any).accessToken;
        return token;
      }

      // For Google users: sync with backend if we don't yet have a backend token
      if (token.googleEmail && !token.accessToken) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${apiUrl}/auth/social-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.googleEmail,
              name: token.googleName,
              image: token.googleImage,
              provider: "google",
              providerAccountId: token.googleProviderAccountId,
            }),
          });
          if (res.ok) {
            const body = await res.json();
            if (body.data) {
              token.userId = body.data.user.id;
              token.role = body.data.user.role;
              token.accessToken = body.data.token;
            }
          }
        } catch {
          // API unreachable — keep token as-is, will retry on next JWT refresh
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).role = token.role;
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  cookies: {
    sessionToken: {
      name: "kana-customer.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: false },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
