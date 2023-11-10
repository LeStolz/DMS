import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getDb } from "./dbs";
import indexRouter from "./routes/index/router";
import authRouter from "./routes/auth/router";
import usersRouter from "./routes/users/router";
import identityRouter from "./routes/identity/router";
import profileRouter from "./routes/profile/router";
import Service from "./layouts/room/service";
import dentistRouter from "./routes/dentistTest/router";
import staffRouter from "./routes/stafffTest/router";
import adminRouter from "./routes/adminTest/router";

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
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use("/identity", identityRouter);
app.use("/profile", profileRouter);
app.use("/dentist", dentistRouter);
app.use("/staff", staffRouter);
app.use("/admin", adminRouter);

export default app;
