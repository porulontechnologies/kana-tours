import { Request, Response, NextFunction } from "express";
import * as redbusService from "../services/external/redbus.service";
import { sendSuccess } from "../utils/apiResponse";

export async function searchBuses(req: Request, res: Response, next: NextFunction) {
  try {
    const buses = await redbusService.searchBuses(req.body);
    sendSuccess(res, buses, "Buses retrieved successfully");
  } catch (error) {
    next(error);
  }
}

export async function getSeatLayout(req: Request, res: Response, next: NextFunction) {
  try {
    const layout = await redbusService.getSeatLayout(req.params.tripId);
    sendSuccess(res, layout);
  } catch (error) {
    next(error);
  }
}

export async function bookBus(req: Request, res: Response, next: NextFunction) {
  try {
    const { tripId, seatNumbers, boardingPointId, droppingPointId, passengers } = req.body;
    const blockResult = await redbusService.blockSeat(
      tripId,
      seatNumbers,
      boardingPointId,
      droppingPointId,
      passengers
    );
    const booking = await redbusService.bookTicket(blockResult.blockKey);
    sendSuccess(res, booking, "Bus booked successfully", 201);
  } catch (error) {
    next(error);
  }
}
