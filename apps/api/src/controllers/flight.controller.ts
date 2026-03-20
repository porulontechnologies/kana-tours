import { Request, Response, NextFunction } from "express";
import * as amadeusService from "../services/external/amadeus.service";
import { sendSuccess } from "../utils/apiResponse";

export async function searchFlights(req: Request, res: Response, next: NextFunction) {
  try {
    const flights = await amadeusService.searchFlights(req.body);
    sendSuccess(res, flights, "Flights retrieved successfully");
  } catch (error) {
    next(error);
  }
}

export async function searchAirports(req: Request, res: Response, next: NextFunction) {
  try {
    const keyword = (req.query.keyword as string)?.trim();
    if (!keyword || keyword.length < 2) return sendSuccess(res, []);
    const results = await amadeusService.searchAirports(keyword);
    sendSuccess(res, results);
  } catch (error) {
    next(error);
  }
}

export async function getFlightOffer(req: Request, res: Response, next: NextFunction) {
  try {
    const offer = await amadeusService.getFlightOffer(req.params.offerId);
    sendSuccess(res, offer);
  } catch (error) {
    next(error);
  }
}

export async function bookFlight(req: Request, res: Response, next: NextFunction) {
  try {
    const { offer, travelers } = req.body;
    const order = await amadeusService.createFlightOrder(offer, travelers);
    sendSuccess(res, order, "Flight booked successfully", 201);
  } catch (error) {
    next(error);
  }
}
