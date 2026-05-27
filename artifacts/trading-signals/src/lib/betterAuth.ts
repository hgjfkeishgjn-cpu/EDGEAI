// Better Auth configuration - auth for the app
import { createAuthClient } from "better-auth/client";
import { sentinelClient } from "@better-auth/infra/client";

// Use the deployed app URL for auth - routes through our own API to avoid CORS
const betterAuthURL = import.meta.env.VITE_BETTER_AUTH_URL || window.location.origin;

// Create auth client with sentinel support
export const authClient = createAuthClient({
  baseURL: betterAuthURL,
  basePath: "/api/auth",
  plugins: [sentinelClient()],
});
