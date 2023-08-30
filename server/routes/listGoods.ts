import Router from "express";

const listRouter = Router();

listRouter.post("/list");
listRouter.delete("/list");
listRouter.get("/list");

export default listRouter;
