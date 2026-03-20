import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { prisma } from "@kana/database";
import { sendSuccess, sendError } from "../utils/apiResponse";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);
    sendSuccess(res, result, "Account created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    sendSuccess(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
}

export async function googleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.body;
    const result = await authService.authenticateWithGoogle(token);
    sendSuccess(res, result, "Authentication successful");
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return sendError(res, "Not authenticated", 401);
    }
    const user = await authService.getUserById(req.user.id);
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
}

export async function socialLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, image, provider, providerAccountId } = req.body;
    if (!email) return sendError(res, "Email is required", 400);

    const user = await prisma.user.upsert({
      where: { email },
      update: { name: name ?? undefined, image: image ?? undefined },
      create: {
        email,
        name,
        image,
        googleId: provider === "google" ? providerAccountId : undefined,
        emailVerified: new Date(),
        role: "CUSTOMER",
      },
      select: { id: true, email: true, name: true, image: true, role: true },
    });
    sendSuccess(res, user, "User synced");
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  sendSuccess(res, null, "Logged out successfully");
}
