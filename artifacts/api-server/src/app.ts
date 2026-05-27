import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
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

app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight auth verification endpoint to allow external services to check
// whether Better Auth / auth integration is configured. Placed before Clerk
// middleware so it can respond even when Clerk keys are not set.
// Intercept requests for the auth-check endpoint before any auth middleware
// so external verifiers (which may send paths like "//api/auth") always get
// a simple health/verification response.
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

// Conditionally apply Clerk middleware only if CLERK_PUBLISHABLE_KEY is set.
// When migrating to Better Auth, Clerk can be disabled entirely.
if (process.env.CLERK_PUBLISHABLE_KEY) {
  app.use(
    clerkMiddleware((req) => ({
      publishableKey: publishableKeyFromHost(
        getClerkProxyHost(req) ?? "",
        process.env.CLERK_PUBLISHABLE_KEY,
      ),
    })),
  );
}

app.use("/api", router);

app.use(express.static(frontendDist, { extensions: ["html"], index: false }));

app.use((req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
