import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@kana/database";
import { env } from "../config/env";
import { UnauthorizedError, ConflictError } from "../utils/errors";

interface GoogleUserInfo {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

export async function authenticateWithGoogle(googleToken: string) {
  // Verify Google token by calling Google's tokeninfo endpoint
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`
  );

  if (!response.ok) {
    throw new UnauthorizedError("Invalid Google token");
  }

  const googleUser: GoogleUserInfo = await response.json();

  if (!googleUser.email) {
    throw new UnauthorizedError("Google account has no email");
  }

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email: googleUser.email },
    update: {
      name: googleUser.name,
      image: googleUser.picture,
      googleId: googleUser.sub,
      emailVerified: googleUser.email_verified ? new Date() : null,
    },
    create: {
      email: googleUser.email,
      name: googleUser.name,
      image: googleUser.picture,
      googleId: googleUser.sub,
      emailVerified: googleUser.email_verified ? new Date() : null,
      role: "CUSTOMER",
    },
  });

  const token = generateToken(user.id, user.email, user.role);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    },
    token,
  };
}

export async function registerUser(name: string, email: string, password: string) {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });

  if (existing) {
    if (existing.password) {
      // Account already has a password — cannot re-register
      throw new ConflictError("An account with this email already exists. Please sign in.");
    }
    // Account exists but has no password (e.g. created by admin) — activate it
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.update({
      where: { id: existing.id },
      data: { name, password: hashed, emailVerified: new Date() },
      select: { id: true, email: true, name: true, image: true, role: true },
    });
    const token = generateToken(user.id, user.email, user.role);
    return { user, token };
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "CUSTOMER", emailVerified: new Date() },
    select: { id: true, email: true, name: true, image: true, role: true },
  });
  const token = generateToken(user.id, user.email, user.role);
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, image: true, role: true, password: true },
  });
  if (!user || !user.password) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const { password: _, ...safeUser } = user;
  const token = generateToken(safeUser.id, safeUser.email, safeUser.role);
  return { user: safeUser, token };
}

export function generateToken(
  userId: string,
  email: string,
  role: string
): string {
  return jwt.sign({ userId, email, role }, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
}
