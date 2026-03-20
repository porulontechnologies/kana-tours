import { Request, Response, NextFunction } from "express";
import { prisma } from "@kana/database";
import bcrypt from "bcryptjs";
import { sendSuccess } from "../utils/apiResponse";
import { buildPaginationMeta } from "../utils/apiResponse";
import { NotFoundError } from "../utils/errors";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
          _count: { select: { bookings: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    sendSuccess(res, users, undefined, 200, buildPaginationMeta(page, limit, total));
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
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
    if (!user) throw new NotFoundError("User");
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, phone, image } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, phone, image },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        phone: true,
        role: true,
      },
    });
    sendSuccess(res, user, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, role, phone } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }
    const user = await prisma.user.create({
      data: { name, email, role: role || "CUSTOMER", phone },
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
    sendSuccess(res, user, "User created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    const { name, phone, image } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, phone, image },
      select: { id: true, email: true, name: true, image: true, phone: true, role: true },
    });
    sendSuccess(res, user, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function changeMyPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "currentPassword and newPassword are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "New password must be at least 8 characters" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { password: true } });
    if (!user || !user.password) {
      return res.status(400).json({ success: false, message: "No password set on this account (Google sign-in)" });
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
    sendSuccess(res, null, "Password changed successfully");
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { role } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) throw new NotFoundError("User");
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    sendSuccess(res, updated, "User role updated successfully");
  } catch (error) {
    next(error);
  }
}
