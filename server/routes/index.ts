import Router from "express";

import basketRouter from "./basket.routes";
import goodsRouter from "./goods.routes";
import infoRouter from "./infoGoods.routes";
import listRouter from "./listGoods.routes";
import ratingRouter from "./rating.routes";
import typeRouter from "./typeGoods.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/basket", basketRouter);
router.use("/goods", goodsRouter);
router.use("/info", infoRouter);
router.use("/rating", ratingRouter);
router.use("/list", listRouter);

export default router;
