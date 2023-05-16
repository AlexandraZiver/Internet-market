const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const swaggerSetup = require("./swagger");
const app = express();
const errorHandler = require("./error-handler");

app.use(cors());
app.use(errorHandler);
app.use(helmet());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
swaggerSetup(app);
app.get("/", (req, res) => {
  res.render("index");
});

/**
 * @swagger
 * /:
 *   get:
 *    summary: Get information about the user
 *    description: return info about user and including their userName and hobbies
 *    parameters:
 *        -in: query
 *        name: username
 *        schema:
 *          required:true
 *           type:string
   responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: User not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

app.get("/", (req, res) => {
  res.render("index", { username: req.params.username, hobbies: hobbies });
  next(new Error("Failed"));
});

app.post("/checkUser", (req, res) => {
  console.log(req.body);
});

app.get("*", (req, res) => {
  res.status(404).send("404 - page not found");
});

app.listen(3000, () => {
  console.log("server started");
});
