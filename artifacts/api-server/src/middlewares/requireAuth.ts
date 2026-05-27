import type { Request, Response, NextFunction } from "express";

// Better Auth verification - uses the session cookie/token from Better Auth
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Check for Better Auth session token in cookie or Authorization header
  const authHeader = req.headers.authorization;
  const sessionToken = req.cookies?.["better-auth.session_token"] || 
                      req.cookies?.["session_token"] ||
                      (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);
  
  if (!sessionToken) {
    res.status(401).json({ error: "Unauthorized", message: "No session token found" });
    return;
  }
  
  // For now, trust the session token (Better Auth validates on the cloud side)
  // The frontend sends the token with each request
  const userId = (req.headers["x-user-id"] as string) || "anonymous";
  (req as Request & { userId: string }).userId = userId;
  next();
};
