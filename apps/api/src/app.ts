import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { apiLimiter } from "./middleware/rateLimiter.middleware";
import routes from "./routes";
import { sendSuccess } from "./utils/apiResponse";

const app = express();

// Security & parsing
app.use(helmet());
app.use(
  cors({
    origin: [env.CUSTOMER_APP_URL, env.ADMIN_APP_URL, env.AGENT_APP_URL],
    credentials: true,
  })
);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
app.use("/api/", apiLimiter);

// Health check
app.get("/api/v1/health", (_req, res) => {
  sendSuccess(res, {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API routes
app.use("/api/v1", routes);

// Error handler
app.use(errorHandler);

export default app;
