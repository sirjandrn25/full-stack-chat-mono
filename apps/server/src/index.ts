import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import AllRouter from "./route";
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
  console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
  await mongoose.connect(process.env.DATABASE_URL);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use("/api", AllRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
// app.use("/api", ModuleRouter);
app.get("/customers", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
