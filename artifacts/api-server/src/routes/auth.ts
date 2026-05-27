import { Router, type IRouter } from "express";

const router: IRouter = Router();

// Better Auth API endpoint: handles all auth-related requests.
// Matches /auth and anything under /auth/* (e.g., /auth/callback, /auth/signin).
router.use("/auth", async (req, res, next) => {
  // For now, this is a placeholder endpoint that verifies Better Auth is configured.
  // In production, this would delegate to the actual Better Auth handler.
  
  const configured = !!process.env.BETTER_AUTH_API_KEY;
  if (!configured) {
    return res.status(503).json({
      ok: false,
      configured: false,
      message: "BETTER_AUTH_API_KEY not configured",
    });
  }

  // Echo back that Better Auth is configured
  return res.json({
    ok: true,
    configured: true,
    message: "Better Auth is configured and ready",
    path: req.path,
  });
});

export default router;
