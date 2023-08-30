import Router from "express";

import authRouter from "./auth";
import basketRouter from "./basket";
import goodsRouter from "./goods";
import infoRouter from "./infoGoods";
import listRouter from "./listGoods";
import ratingRouter from "./rating";
import typeRouter from "./typeGoods";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/basket", basketRouter);
router.use("/goods", goodsRouter);
router.use("/info", infoRouter);
router.use("/rating", ratingRouter);
router.use("/list", listRouter);
router.use("/auth", authRouter);

export default router;
