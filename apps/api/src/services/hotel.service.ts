import { prisma } from "@kana/database";
import slugify from "slugify";
import type { HotelFilters } from "@kana/types";
import { buildPaginationMeta } from "../utils/apiResponse";
import { NotFoundError, ConflictError } from "../utils/errors";

export async function createHotel(data: {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  starRating?: number;
  amenities?: string[];
  images?: string[];
  pricePerNight: number;
  contactEmail?: string;
  contactPhone?: string;
}) {
  const slug = slugify(data.name, { lower: true, strict: true });

  const existing = await prisma.hotel.findUnique({ where: { slug } });
  if (existing) throw new ConflictError("Hotel with this name already exists");

  return prisma.hotel.create({
    data: { ...data, slug },
    include: { rooms: true },
  });
}

export async function getHotels(filters: HotelFilters & { includeInactive?: boolean }) {
  const { city, minPrice, maxPrice, minRating, page = 1, limit = 10, includeInactive } = filters;

  const where: Record<string, unknown> = {};
  if (!includeInactive) where.isActive = true;
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.pricePerNight = {
      ...(minPrice ? { gte: minPrice } : {}),
      ...(maxPrice ? { lte: maxPrice } : {}),
    };
  }
  if (minRating) where.starRating = { gte: minRating };

  const [hotels, total] = await Promise.all([
    prisma.hotel.findMany({
      where: where as any,
      include: { rooms: { where: { isActive: true } } },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.hotel.count({ where: where as any }),
  ]);

  return { hotels, meta: buildPaginationMeta(page, limit, total) };
}

export async function getHotelBySlug(slug: string) {
  const hotel = await prisma.hotel.findUnique({
    where: { slug },
    include: { rooms: { where: { isActive: true } } },
  });
  if (!hotel) throw new NotFoundError("Hotel");
  return hotel;
}

export async function getHotelById(id: string) {
  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: { rooms: true },
  });
  if (!hotel) throw new NotFoundError("Hotel");
  return hotel;
}

export async function updateHotel(id: string, data: Record<string, unknown>) {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw new NotFoundError("Hotel");

  if (data.name && data.name !== hotel.name) {
    (data as any).slug = slugify(data.name as string, { lower: true, strict: true });
  }

  return prisma.hotel.update({
    where: { id },
    data: data as any,
    include: { rooms: true },
  });
}

export async function deleteHotel(id: string) {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw new NotFoundError("Hotel");

  return prisma.hotel.update({
    where: { id },
    data: { isActive: false },
  });
}

export async function addRoom(
  hotelId: string,
  data: {
    type: string;
    capacity: number;
    pricePerNight: number;
    amenities?: string[];
    images?: string[];
    totalRooms: number;
  }
) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
  if (!hotel) throw new NotFoundError("Hotel");

  return prisma.room.create({
    data: { ...data, hotelId },
  });
}

export async function getHotelRooms(hotelId: string) {
  return prisma.room.findMany({
    where: { hotelId, isActive: true },
  });
}
