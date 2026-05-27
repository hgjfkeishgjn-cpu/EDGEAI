// Better Auth configuration for authentication using Better Auth's hosted dash service.
import { createAuthClient } from "better-auth/client";
import { sentinelClient } from "@better-auth/infra/client";

// Use relative URL for same-origin (proxied through our Vercel API)
// This avoids CORS issues by routing through our own server
const betterAuthURL = import.meta.env.VITE_BETTER_AUTH_URL || window.location.origin;

// Client-side auth utilities with sentinel support
export const authClient = createAuthClient({
  baseURL: betterAuthURL,
  basePath: "/api/auth",
  plugins: [
    // Sentinel client helpers for runtime auth checks
    sentinelClient(),
  ],
});
