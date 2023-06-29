import "dotenv/config";
import express, { Request, NextFunction, Response } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import logger from "./winston";
import errorHandler from "./errorHandler";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req: Request, res: any, next: NextFunction) => {
  res.render("index", { username: req.params?.username });
  next(new Error("Failed"));
});

app.post("/checkUser", (req: Request, res: Response) => {
  logger.info(req.body);
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("404 - page not found");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info(`server started http://localhost:${process.env.PORT}`);
});
