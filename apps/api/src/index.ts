import app from "./app";
import { env } from "./config/env";
import { connectMongo } from "@kana/database";
import { logger } from "./utils/logger";

async function start() {
  try {
    // Connect MongoDB (optional - won't crash if unavailable)
    await connectMongo().catch((err) => {
      logger.warn("MongoDB not available, some features will be disabled");
    });

    const port = parseInt(env.PORT, 10);
    app.listen(port, () => {
      logger.info(`API server running on http://localhost:${port}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error(error, "Failed to start server");
    process.exit(1);
  }
}

start();
