import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRouter from "./routes/users/router";
import indexRouter from "./routes/index/router";
import { getDb } from "./dbs";

config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(async (req, res, next) => {
  req.db = await getDb("guest");

  return next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
