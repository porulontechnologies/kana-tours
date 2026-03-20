import { Request, Response, NextFunction } from "express";
import * as hotelService from "../services/hotel.service";
import { sendSuccess } from "../utils/apiResponse";

export async function createHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.createHotel(req.body);
    sendSuccess(res, hotel, "Hotel created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const { hotels, meta } = await hotelService.getHotels(req.query as any);
    sendSuccess(res, hotels, undefined, 200, meta);
  } catch (error) {
    next(error);
  }
}

export async function getHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.getHotelBySlug(req.params.slug);
    sendSuccess(res, hotel);
  } catch (error) {
    next(error);
  }
}

export async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.getHotelById(req.params.id);
    sendSuccess(res, hotel);
  } catch (error) {
    next(error);
  }
}

export async function updateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelService.updateHotel(req.params.id, req.body);
    sendSuccess(res, hotel, "Hotel updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteHotel(req: Request, res: Response, next: NextFunction) {
  try {
    await hotelService.deleteHotel(req.params.id);
    sendSuccess(res, null, "Hotel deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function addRoom(req: Request, res: Response, next: NextFunction) {
  try {
    const room = await hotelService.addRoom(req.params.id, req.body);
    sendSuccess(res, room, "Room added successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getHotelRooms(req: Request, res: Response, next: NextFunction) {
  try {
    const rooms = await hotelService.getHotelRooms(req.params.id);
    sendSuccess(res, rooms);
  } catch (error) {
    next(error);
  }
}
