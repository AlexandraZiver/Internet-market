import Router from "express";

const ratingRouter = Router();

ratingRouter.post("/response");
ratingRouter.delete("/response");
ratingRouter.get("/response");

export default ratingRouter;
