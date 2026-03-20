import { prisma } from "@kana/database";
import slugify from "slugify";
import type { TourPackageFilters } from "@kana/types";
import { buildPaginationMeta } from "../utils/apiResponse";
import { NotFoundError, ConflictError } from "../utils/errors";

export async function createTourPackage(data: {
  name: string;
  description: string;
  shortDescription?: string;
  destination: string;
  duration: number;
  nights: number;
  maxGroupSize: number;
  price: number;
  discountedPrice?: number;
  inclusions?: string[];
  exclusions?: string[];
  itinerary: unknown[];
  images?: string[];
  coverImage?: string;
  startDates?: string[];
  category: string;
  isFeatured?: boolean;
}) {
  const slug = slugify(data.name, { lower: true, strict: true });

  const existing = await prisma.tourPackage.findUnique({ where: { slug } });
  if (existing) throw new ConflictError("Package with this name already exists");

  const { startDates, ...rest } = data;

  return prisma.tourPackage.create({
    data: {
      ...rest,
      slug,
      startDates: startDates?.map((d) => new Date(d)) ?? [],
    },
  });
}

export async function getTourPackages(filters: TourPackageFilters & { includeInactive?: boolean }) {
  const {
    destination,
    category,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    page = 1,
    limit = 10,
    includeInactive,
  } = filters;

  const where: Record<string, unknown> = {};
  if (!includeInactive) where.isActive = true;
  if (destination)
    where.destination = { contains: destination, mode: "insensitive" };
  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: minPrice } : {}),
      ...(maxPrice ? { lte: maxPrice } : {}),
    };
  }
  if (minDuration || maxDuration) {
    where.duration = {
      ...(minDuration ? { gte: minDuration } : {}),
      ...(maxDuration ? { lte: maxDuration } : {}),
    };
  }

  const [packages, total] = await Promise.all([
    prisma.tourPackage.findMany({
      where: where as any,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.tourPackage.count({ where: where as any }),
  ]);

  return { packages, meta: buildPaginationMeta(page, limit, total) };
}

export async function getFeaturedPackages() {
  return prisma.tourPackage.findMany({
    where: { isActive: true, isFeatured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPackageById(id: string) {
  const pkg = await prisma.tourPackage.findUnique({ where: { id } });
  if (!pkg) throw new NotFoundError("Tour Package");
  return pkg;
}

export async function getPackageBySlug(slug: string) {
  const pkg = await prisma.tourPackage.findUnique({ where: { slug } });
  if (!pkg) throw new NotFoundError("Tour Package");
  return pkg;
}

export async function updateTourPackage(
  id: string,
  data: Record<string, unknown>
) {
  const pkg = await prisma.tourPackage.findUnique({ where: { id } });
  if (!pkg) throw new NotFoundError("Tour Package");

  if (data.name && data.name !== pkg.name) {
    (data as any).slug = slugify(data.name as string, {
      lower: true,
      strict: true,
    });
  }

  if (data.startDates) {
    (data as any).startDates = (data.startDates as string[]).map(
      (d) => new Date(d)
    );
  }

  return prisma.tourPackage.update({
    where: { id },
    data: data as any,
  });
}

export async function deleteTourPackage(id: string) {
  const pkg = await prisma.tourPackage.findUnique({ where: { id } });
  if (!pkg) throw new NotFoundError("Tour Package");

  return prisma.tourPackage.update({
    where: { id },
    data: { isActive: false },
  });
}
