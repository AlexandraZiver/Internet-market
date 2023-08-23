import Router from "express";

const infoRouter = Router();

infoRouter.post("/info");
infoRouter.delete("/info");
infoRouter.get("/info");
infoRouter.put("/info");

export default infoRouter;
