import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(
  __dirname,
  "..",
  "..",
  "trading-signals",
  "dist",
  "public",
);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth-check endpoint
app.use((req, res, next) => {
  try {
    const url = req.url || "";
    if (url === "/api/auth" || url === "//api/auth" || url.startsWith("/api/auth") || url.includes("/api/auth")) {
      const ok = !!process.env.BETTER_AUTH_API_KEY;
      if (!ok) return res.status(503).json({ ok: false, configured: false, message: "BETTER_AUTH_API_KEY not set" });
      return res.json({ ok: true, configured: true });
    }
  } catch (err) {
    // swallow and continue to next middleware
  }
  return next();
});

app.use("/api", router);

app.use(express.static(frontendDist, { extensions: ["html"], index: false }));

app.use((req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
