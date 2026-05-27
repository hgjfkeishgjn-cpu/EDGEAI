// Better Auth configuration - optional auth for the app
import { createAuthClient } from "better-auth/client";
import { sentinelClient } from "@better-auth/infra/client";

// Use relative URL - auth is optional for this demo
const betterAuthURL = ""; // Leave empty to disable remote auth

// Create auth client (will be no-op if URL is empty)
export const authClient = betterAuthURL ? createAuthClient({
  baseURL: betterAuthURL,
  basePath: "/api/auth",
  plugins: [sentinelClient()],
}) : createAuthClient({
  baseURL: "/api/auth",
  plugins: [sentinelClient()],
});
