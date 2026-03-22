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
    const q = req.query as Record<string, string>;

    // Parse priceRange e.g. "10000-25000" or "50000+"
    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (q.priceRange) {
      if (q.priceRange.endsWith("+")) {
        minPrice = Number(q.priceRange.slice(0, -1));
      } else {
        const [lo, hi] = q.priceRange.split("-").map(Number);
        minPrice = lo;
        maxPrice = hi;
      }
    }

    // Parse duration e.g. "4-6" or "10+"
    let minDuration: number | undefined;
    let maxDuration: number | undefined;
    if (q.duration) {
      if (q.duration.endsWith("+")) {
        minDuration = Number(q.duration.slice(0, -1));
      } else {
        const [lo, hi] = q.duration.split("-").map(Number);
        minDuration = lo;
        maxDuration = hi;
      }
    }

    const filters = {
      destination: q.destination,
      category: q.category,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      sortBy: q.sortBy,
      page: q.page ? Number(q.page) : 1,
      limit: q.limit ? Number(q.limit) : 10,
    };

    const { packages, meta } = await packageService.getTourPackages(filters as any);
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
