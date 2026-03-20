import { Request, Response, NextFunction } from "express";
import * as packageService from "../services/package.service";
import { sendSuccess } from "../utils/apiResponse";

export async function createPackage(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await packageService.createTourPackage(req.body);
    sendSuccess(res, pkg, "Tour package created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getPackages(req: Request, res: Response, next: NextFunction) {
  try {
    const { packages, meta } = await packageService.getTourPackages(req.query as any);
    sendSuccess(res, packages, undefined, 200, meta);
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedPackages(_req: Request, res: Response, next: NextFunction) {
  try {
    const packages = await packageService.getFeaturedPackages();
    sendSuccess(res, packages);
  } catch (error) {
    next(error);
  }
}

export async function getPackageById(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await packageService.getPackageById(req.params.id);
    sendSuccess(res, pkg);
  } catch (error) {
    next(error);
  }
}

export async function getPackage(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await packageService.getPackageBySlug(req.params.slug);
    sendSuccess(res, pkg);
  } catch (error) {
    next(error);
  }
}

export async function updatePackage(req: Request, res: Response, next: NextFunction) {
  try {
    const pkg = await packageService.updateTourPackage(req.params.id, req.body);
    sendSuccess(res, pkg, "Package updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function deletePackage(req: Request, res: Response, next: NextFunction) {
  try {
    await packageService.deleteTourPackage(req.params.id);
    sendSuccess(res, null, "Package deleted successfully");
  } catch (error) {
    next(error);
  }
}
