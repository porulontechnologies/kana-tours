import { prisma } from "@kana/database";
import { ConflictError, NotFoundError } from "../utils/errors";
import bcrypt from "bcryptjs";

export async function listAgents(page: number, limit: number, search?: string) {
  const skip = (page - 1) * limit;
  const where = search
    ? {
        OR: [
          { user: { name: { contains: search, mode: "insensitive" as const } } },
          { user: { email: { contains: search, mode: "insensitive" as const } } },
          { agencyName: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [agents, total] = await Promise.all([
    prisma.tourAgent.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true, image: true, createdAt: true } },
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.tourAgent.count({ where }),
  ]);

  return { agents, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getAgent(id: string) {
  const agent = await prisma.tourAgent.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, image: true, phone: true, createdAt: true } },
      _count: { select: { bookings: true } },
    },
  });
  if (!agent) throw new NotFoundError("Tour agent not found");
  return agent;
}

export async function getAgentByUserId(userId: string) {
  const agent = await prisma.tourAgent.findUnique({
    where: { userId },
    include: {
      user: { select: { id: true, name: true, email: true, image: true, phone: true } },
    },
  });
  if (!agent) throw new NotFoundError("Agent profile not found");
  return agent;
}

export async function createAgent(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  agencyName?: string;
  address?: string;
  flightCommission?: number;
  busCommission?: number;
  hotelCommission?: number;
  tourCommission?: number;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new ConflictError("A user with this email already exists");

  const hashed = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      phone: data.phone,
      role: "AGENT",
      emailVerified: new Date(),
    },
  });

  const agent = await prisma.tourAgent.create({
    data: {
      userId: user.id,
      agencyName: data.agencyName,
      phone: data.phone,
      address: data.address,
      flightCommission: data.flightCommission ?? 0,
      busCommission: data.busCommission ?? 0,
      hotelCommission: data.hotelCommission ?? 0,
      tourCommission: data.tourCommission ?? 0,
    },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
    },
  });

  return agent;
}

export async function updateCommissions(
  id: string,
  commissions: {
    flightCommission?: number;
    busCommission?: number;
    hotelCommission?: number;
    tourCommission?: number;
  }
) {
  const agent = await prisma.tourAgent.findUnique({ where: { id } });
  if (!agent) throw new NotFoundError("Tour agent not found");

  return prisma.tourAgent.update({
    where: { id },
    data: commissions,
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });
}

export async function toggleAgentStatus(id: string) {
  const agent = await prisma.tourAgent.findUnique({ where: { id } });
  if (!agent) throw new NotFoundError("Tour agent not found");

  return prisma.tourAgent.update({
    where: { id },
    data: { isActive: !agent.isActive },
  });
}

export async function getAgentStats(agentId: string) {
  const [bookings, commissionEarned] = await Promise.all([
    prisma.booking.groupBy({
      by: ["bookingType", "status"],
      where: { agentId },
      _count: { id: true },
      _sum: { totalAmount: true },
    }),
    prisma.booking.findMany({
      where: { agentId, status: { in: ["CONFIRMED", "COMPLETED"] } },
      select: { bookingType: true, totalAmount: true },
    }),
  ]);

  const agent = await prisma.tourAgent.findUnique({ where: { id: agentId } });
  if (!agent) throw new NotFoundError("Agent not found");

  let totalCommission = 0;
  for (const b of commissionEarned) {
    const rate =
      b.bookingType === "FLIGHT"
        ? agent.flightCommission
        : b.bookingType === "BUS"
        ? agent.busCommission
        : b.bookingType === "HOTEL"
        ? agent.hotelCommission
        : agent.tourCommission;
    totalCommission += (b.totalAmount * rate) / 100;
  }

  const totalBookings = bookings.reduce((s, g) => s + g._count.id, 0);
  const totalRevenue = bookings.reduce((s, g) => s + (g._sum.totalAmount ?? 0), 0);

  return { bookings, totalBookings, totalRevenue, totalCommission };
}
