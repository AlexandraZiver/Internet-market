import Router from "express";

import BasketController from "../controllers/basket.controller";

const basketRouter = Router();

basketRouter.post("/basket", BasketController.added);
basketRouter.delete("/basket", BasketController.delete);
basketRouter.get("/basket", BasketController.getGoods);

export default basketRouter;
