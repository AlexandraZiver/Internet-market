import { Router } from "express";

import GoodsController from "../controllers/goods.controller";

const goodsRouter = Router();
goodsRouter.post("/", GoodsController.create);
goodsRouter.get("/", GoodsController.get);
goodsRouter.get("/:id", GoodsController.getOne);
goodsRouter.delete("/");
goodsRouter.put("/");

export default goodsRouter;
