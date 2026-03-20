import { Request, Response, NextFunction } from "express";
import * as agentService from "../services/agent.service";
import { sendSuccess, sendError } from "../utils/apiResponse";

export async function getAgents(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;
    const result = await agentService.listAgents(page, limit, search);
    sendSuccess(res, result.agents, "Agents fetched", 200, {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAgent(req: Request, res: Response, next: NextFunction) {
  try {
    const agent = await agentService.getAgent(req.params.id);
    sendSuccess(res, agent);
  } catch (err) {
    next(err);
  }
}

export async function getMyAgentProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const agent = await agentService.getAgentByUserId(userId);
    sendSuccess(res, agent);
  } catch (err) {
    next(err);
  }
}

export async function createAgent(req: Request, res: Response, next: NextFunction) {
  try {
    const agent = await agentService.createAgent(req.body);
    sendSuccess(res, agent, "Tour agent created successfully", 201);
  } catch (err) {
    next(err);
  }
}

export async function updateCommissions(req: Request, res: Response, next: NextFunction) {
  try {
    const agent = await agentService.updateCommissions(req.params.id, req.body);
    sendSuccess(res, agent, "Commission rates updated");
  } catch (err) {
    next(err);
  }
}

export async function toggleAgentStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const agent = await agentService.toggleAgentStatus(req.params.id);
    sendSuccess(res, agent, `Agent ${agent.isActive ? "activated" : "deactivated"}`);
  } catch (err) {
    next(err);
  }
}

export async function getAgentStats(req: Request, res: Response, next: NextFunction) {
  try {
    const agentId = req.params.id;
    const stats = await agentService.getAgentStats(agentId);
    sendSuccess(res, stats);
  } catch (err) {
    next(err);
  }
}

export async function getMyStats(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const agentProfile = await agentService.getAgentByUserId(userId);
    const stats = await agentService.getAgentStats(agentProfile.id);
    sendSuccess(res, stats);
  } catch (err) {
    next(err);
  }
}
