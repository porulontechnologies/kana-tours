import { Request, Response, NextFunction } from "express";
import * as siteConfigService from "../services/siteConfig.service";
import { sendSuccess } from "../utils/apiResponse";

export async function getSiteConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const config = await siteConfigService.getSiteConfig();
    sendSuccess(res, config);
  } catch (error) {
    next(error);
  }
}

export async function updateSiteConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const config = await siteConfigService.updateSiteConfig(req.body);
    sendSuccess(res, config, "Site configuration updated successfully");
  } catch (error) {
    next(error);
  }
}
