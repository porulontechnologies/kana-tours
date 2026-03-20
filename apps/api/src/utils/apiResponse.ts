import { Response } from "express";
import type { PaginationMeta } from "@kana/types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  meta?: PaginationMeta
) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    meta,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  error?: string
) {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
