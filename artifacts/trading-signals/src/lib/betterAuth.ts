// Better Auth server initialization for authentication and API.
// Uses Better Auth's dash() plugin for dashboard integration.
import { betterAuth } from "better-auth";
import { createAuthClient } from "@better-auth/core";
import { dash } from "@better-auth/infra";
import { sentinelClient } from "@better-auth/infra/client";

// Initialize the Better Auth instance with minimal required config.
// For full integration, add database, oauth providers, etc.
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4173",
  basePath: "/api/auth",
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-key-change-in-production",
  plugins: [
    // adds the Better Auth dashboard integration (onboarding verification)
    dash(),
  ],
  // Minimal database config using in-memory store (for dev/testing).
  // In production, use a real database adapter.
  database: undefined, // Better Auth will use default in-memory for unspecified
});

// Client-side auth utilities with sentinel support
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4173",
  basePath: "/api/auth",
  plugins: [
    // adds sentinel client helpers for runtime auth checks
    sentinelClient(),
  ],
});

export default auth;
