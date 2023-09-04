import Router from "express";

import authRouter from "./auth";
import basketRouter from "./basket";
import goodsRouter from "./goods";
import GoodsRating from "./goodsRating";
import typeRouter from "./goodsType";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/basket", basketRouter);
router.use("/goods", goodsRouter);
router.use("/rating", GoodsRating);
router.use("/auth", authRouter);

export default router;
