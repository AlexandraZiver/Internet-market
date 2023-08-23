import "dotenv/config";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import db from "./config/database";
import errorHandler from "./middleware/errorHandler";
import models from "./models";
import router from "./routes/index";
import logger from "./winston";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(fileUpload({}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(errorHandler);
const start = async (): Promise<void> => {
  try {
    await db.sync({ force: false });
    await db.authenticate();
    app.listen(process.env.PORT, () => {
      logger.info(`server started http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    logger.error("Error:", error);
  }
};
start();
