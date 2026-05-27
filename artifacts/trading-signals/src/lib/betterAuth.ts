// Better Auth configuration for authentication using Better Auth's hosted dash service.
import { createAuthClient } from "better-auth/client";
import { sentinelClient } from "@better-auth/infra/client";

// Get the Better Auth URL from environment or use the default hosted URL
const betterAuthURL = import.meta.env.VITE_BETTER_AUTH_URL || "https://kv.better-auth.com";

// Client-side auth utilities with sentinel support
export const authClient = createAuthClient({
  baseURL: betterAuthURL,
  basePath: "/api/auth",
  plugins: [
    // Sentinel client helpers for runtime auth checks
    sentinelClient(),
  ],
});
