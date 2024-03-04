import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
// import ModuleRouter from "./modules/root.route";
// import UserModel from "./user.model";
const bodyParser = require("body-parser");
dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.use(bodyParser.json());

const mongoose = require("mongoose");

db().catch((err) => console.log(err));

async function db() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hotel-mgt");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
// app.use("/api", ModuleRouter);
app.get("/customers", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
