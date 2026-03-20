import { prisma } from "@kana/database";
import type { BookingType, BookingStatus } from "@kana/types";
import { buildPaginationMeta } from "../utils/apiResponse";
import { NotFoundError, ValidationError } from "../utils/errors";

interface CreateBookingData {
  userId: string;
  bookingType: BookingType;
  hotelId?: string;
  roomId?: string;
  tourPackageId?: string;
  externalRef?: string;
  totalAmount?: number;
  currency?: string;
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  passengerDetails?: unknown;
}

export async function createBooking(data: CreateBookingData) {
  let totalAmount = data.totalAmount ?? 0;

  // Calculate total based on booking type (overrides provided amount for accuracy)
  if (data.bookingType === "HOTEL" && data.roomId) {
    const room = await prisma.room.findUnique({ where: { id: data.roomId } });
    if (!room) throw new NotFoundError("Room");
    if (!data.checkIn || !data.checkOut)
      throw new ValidationError("Check-in and check-out dates required for hotel booking");
    const nights = Math.ceil(
      (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    totalAmount = room.pricePerNight * nights * (data.guestCount || 1);
  } else if (data.bookingType === "TOUR_PACKAGE" && data.tourPackageId) {
    const pkg = await prisma.tourPackage.findUnique({ where: { id: data.tourPackageId } });
    if (!pkg) throw new NotFoundError("Tour Package");
    totalAmount = (pkg.discountedPrice ?? pkg.price) * (data.guestCount || 1);
  }

  // Resolve agentId if the booking user is an AGENT
  let agentId: string | undefined;
  const user = await prisma.user.findUnique({ where: { id: data.userId }, select: { role: true } });
  if (user?.role === "AGENT") {
    const agent = await prisma.tourAgent.findUnique({ where: { userId: data.userId } });
    agentId = agent?.id;
  }

  return prisma.booking.create({
    data: {
      userId: data.userId,
      bookingType: data.bookingType,
      status: "PENDING",
      totalAmount,
      currency: data.currency ?? "INR",
      hotelId: data.hotelId,
      roomId: data.roomId,
      tourPackageId: data.tourPackageId,
      externalRef: data.externalRef,
      agentId,
      checkIn: data.checkIn ? new Date(data.checkIn) : null,
      checkOut: data.checkOut ? new Date(data.checkOut) : null,
      guestCount: data.guestCount ?? 1,
      specialRequests: data.specialRequests,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      passengerDetails: data.passengerDetails as any,
    },
    include: {
      hotel: true,
      tourPackage: true,
      payment: true,
    },
  });
}

export async function getBookings(params: {
  page?: number | string;
  limit?: number | string;
  status?: BookingStatus;
  bookingType?: BookingType;
  userId?: string;
  agentId?: string;
}) {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const { status, bookingType, userId, agentId } = params;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (bookingType) where.bookingType = bookingType;
  if (userId) where.userId = userId;
  if (agentId) where.agentId = agentId;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: where as any,
      include: {
        user: { select: { id: true, name: true, email: true } },
        hotel: { select: { id: true, name: true, city: true } },
        tourPackage: { select: { id: true, name: true, destination: true } },
        payment: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count({ where: where as any }),
  ]);

  return { bookings, meta: buildPaginationMeta(page, limit, total) };
}

export async function getBookingById(id: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      hotel: true,
      room: true,
      tourPackage: true,
      payment: true,
    },
  });
  if (!booking) throw new NotFoundError("Booking");
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new NotFoundError("Booking");

  return prisma.booking.update({
    where: { id },
    data: { status },
    include: { payment: true },
  });
}

export async function cancelBooking(id: string, userId?: string) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new NotFoundError("Booking");
  if (userId && booking.userId !== userId) throw new NotFoundError("Booking");

  if (booking.status === "CANCELLED")
    throw new ValidationError("Booking is already cancelled");

  return prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
    include: { payment: true },
  });
}
