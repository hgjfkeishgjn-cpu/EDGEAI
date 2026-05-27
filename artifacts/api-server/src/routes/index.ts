import { Router, type IRouter } from "express";
import healthRouter from "./health";
import signalsRouter from "./signals";
import watchlistRouter from "./watchlist";
import portfolioRouter from "./portfolio";
import marketRouter from "./market";
import alertsRouter from "./alerts";
import subscriptionRouter from "./subscription";
import chatRouter from "./chat";
import chartsRouter from "./charts";
import newsRouter from "./news";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(signalsRouter);
router.use(watchlistRouter);
router.use(portfolioRouter);
router.use(marketRouter);
router.use(alertsRouter);
router.use(subscriptionRouter);
router.use(chatRouter);
router.use(chartsRouter);
router.use(newsRouter);
router.use(authRouter);

export default router;
