import Router from "express";

const ratingRouter = Router();

ratingRouter.post("/rating");
ratingRouter.delete("/rating");
ratingRouter.get("/rating");

export default ratingRouter;
