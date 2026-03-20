import { env } from "../../config/env";
import { SearchCache } from "@kana/database";
import crypto from "crypto";
import type { BusSearchParams, BusResult, SeatLayout } from "@kana/types";

const BASE_URL = env.REDBUS_BASE_URL || "https://api.redbus.in";

async function redbusRequest(endpoint: string, options: RequestInit = {}) {
  if (!env.REDBUS_API_KEY) {
    throw new Error("Redbus API key not configured");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.REDBUS_API_KEY}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Redbus API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function generateCacheKey(params: BusSearchParams): string {
  const str = JSON.stringify(params);
  return crypto.createHash("md5").update(str).digest("hex");
}

export async function searchBuses(
  params: BusSearchParams
): Promise<BusResult[]> {
  const cacheKey = generateCacheKey(params);

  // Check cache
  const cached = await SearchCache.findOne({ cacheKey });
  if (cached) {
    return cached.results as BusResult[];
  }

  const data = await redbusRequest(
    `/v1/buses/search?source=${encodeURIComponent(params.source)}&destination=${encodeURIComponent(params.destination)}&date=${params.date}`
  );

  const results: BusResult[] = (data.inventories || data.buses || []).map(
    (bus: any, index: number) => ({
      id: bus.id || `bus_${index}`,
      tripId: bus.tripId || bus.id,
      operator: bus.operatorName || bus.operator || "Unknown",
      operatorLogo: bus.operatorLogo,
      busType: bus.busType || "Standard",
      departure: {
        time: bus.departureTime || bus.departure,
        location: bus.boardingPoint || params.source,
      },
      arrival: {
        time: bus.arrivalTime || bus.arrival,
        location: bus.droppingPoint || params.destination,
      },
      duration: bus.duration || "",
      price: bus.fare || bus.price || 0,
      currency: "INR",
      seatsAvailable: bus.availableSeats || 0,
      amenities: bus.amenities || [],
      rating: bus.rating,
      boardingPoints: bus.boardingPoints || [],
      droppingPoints: bus.droppingPoints || [],
    })
  );

  // Cache for 15 minutes
  await SearchCache.create({
    cacheKey,
    searchType: "BUS",
    params,
    results,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  return results;
}

export async function getSeatLayout(tripId: string): Promise<SeatLayout> {
  const data = await redbusRequest(`/v1/buses/${tripId}/seats`);

  return {
    tripId,
    totalSeats: data.totalSeats || 0,
    availableSeats: data.availableSeats || 0,
    rows: data.rows || data.seatLayout || [],
  };
}

export async function blockSeat(
  tripId: string,
  seatNumbers: string[],
  boardingPointId: string,
  droppingPointId: string,
  passengerDetails: any[]
) {
  return redbusRequest(`/v1/buses/${tripId}/block`, {
    method: "POST",
    body: JSON.stringify({
      seatNumbers,
      boardingPointId,
      droppingPointId,
      passengers: passengerDetails,
    }),
  });
}

export async function bookTicket(blockKey: string) {
  return redbusRequest(`/v1/buses/book`, {
    method: "POST",
    body: JSON.stringify({ blockKey }),
  });
}
