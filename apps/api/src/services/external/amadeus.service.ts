import Amadeus from "amadeus";
import { env } from "../../config/env";
import { SearchCache } from "@kana/database";
import crypto from "crypto";
import type { FlightSearchParams, FlightOffer } from "@kana/types";

let amadeusClient: InstanceType<typeof Amadeus> | null = null;

function getClient(): InstanceType<typeof Amadeus> {
  if (!amadeusClient) {
    if (!env.AMADEUS_CLIENT_ID || !env.AMADEUS_CLIENT_SECRET) {
      throw new Error("Amadeus credentials not configured");
    }
    amadeusClient = new Amadeus({
      clientId: env.AMADEUS_CLIENT_ID,
      clientSecret: env.AMADEUS_CLIENT_SECRET,
      hostname: (env.AMADEUS_HOSTNAME as "test" | "production") || "test",
    });
  }
  return amadeusClient;
}

function generateCacheKey(params: FlightSearchParams): string {
  const str = JSON.stringify(params);
  return crypto.createHash("md5").update(str).digest("hex");
}

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightOffer[]> {
  const cacheKey = generateCacheKey(params);

  // Check cache first (non-fatal if MongoDB is unavailable)
  try {
    const cached = await SearchCache.findOne({ cacheKey });
    if (cached) return cached.results as FlightOffer[];
  } catch {
    // MongoDB not available, skip cache
  }

  const client = getClient();

  const response = await client.shopping.flightOffersSearch.get({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    ...(params.returnDate ? { returnDate: params.returnDate } : {}),
    adults: params.adults,
    ...(params.children ? { children: params.children } : {}),
    ...(params.infants ? { infants: params.infants } : {}),
    ...(params.travelClass ? { travelClass: params.travelClass } : {}),
    ...(params.nonStop ? { nonStop: params.nonStop } : {}),
    max: 50,
    currencyCode: "INR",
  });

  const offers: FlightOffer[] = (response.data || []).map(
    (offer: any, index: number) => {
      const firstSegment = offer.itineraries[0]?.segments[0];
      const lastSegment =
        offer.itineraries[0]?.segments[
          offer.itineraries[0].segments.length - 1
        ];

      return {
        id: offer.id || `offer_${index}`,
        airline: firstSegment?.carrierCode || "Unknown",
        flightNumber: `${firstSegment?.carrierCode}${firstSegment?.number}`,
        departure: {
          airport: firstSegment?.departure?.iataCode,
          terminal: firstSegment?.departure?.terminal,
          time: firstSegment?.departure?.at,
        },
        arrival: {
          airport: lastSegment?.arrival?.iataCode,
          terminal: lastSegment?.arrival?.terminal,
          time: lastSegment?.arrival?.at,
        },
        duration: offer.itineraries[0]?.duration || "",
        stops: (offer.itineraries[0]?.segments?.length || 1) - 1,
        price: {
          amount: parseFloat(offer.price?.total || "0"),
          currency: offer.price?.currency || "INR",
        },
        seatsAvailable: offer.numberOfBookableSeats,
        segments: (offer.itineraries[0]?.segments || []).map((seg: any) => ({
          airline: seg.carrierCode,
          flightNumber: `${seg.carrierCode}${seg.number}`,
          departure: {
            airport: seg.departure?.iataCode,
            terminal: seg.departure?.terminal,
            time: seg.departure?.at,
          },
          arrival: {
            airport: seg.arrival?.iataCode,
            terminal: seg.arrival?.terminal,
            time: seg.arrival?.at,
          },
          duration: seg.duration || "",
          aircraft: seg.aircraft?.code,
        })),
      };
    }
  );

  // Cache for 15 minutes (non-fatal if MongoDB is unavailable)
  try {
    await SearchCache.create({
      cacheKey,
      searchType: "FLIGHT",
      params,
      results: offers,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
  } catch {
    // MongoDB not available, skip caching
  }

  return offers;
}

export async function searchAirports(keyword: string) {
  const client = getClient();
  const response = await client.referenceData.locations.get({
    keyword,
    subType: "AIRPORT,CITY",
    "page[limit]": 8,
    sort: "analytics.travelers.score",
  });

  return (response.data || []).map((loc: any) => ({
    iataCode: loc.iataCode,
    name: loc.name,
    cityName: loc.address?.cityName || loc.name,
    countryName: loc.address?.countryName,
    subType: loc.subType,
  }));
}

export async function getFlightOffer(offerId: string) {
  const client = getClient();
  const response = await client.shopping.flightOffersSearch.get({
    flightOfferId: offerId,
  });
  return response.data;
}

export async function createFlightOrder(
  offer: any,
  travelers: any[]
) {
  const client = getClient();
  const response = await client.booking.flightOrders.post(
    JSON.stringify({
      data: {
        type: "flight-order",
        flightOffers: [offer],
        travelers,
      },
    })
  );
  return response.data;
}
