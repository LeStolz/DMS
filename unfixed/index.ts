import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter, { getRole } from "./routes/auth/router";
import usersRouter from "./routes/users/router";
import dentistsRouter from "./routes/dentists/router";
import staffsRouter from "./routes/staffs/router";
import adminsRouter from "./routes/admins/router";
import drugsRouter from "./routes/drugs/router";

config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(getRole);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/dentists", dentistsRouter);
app.use("/staffs", staffsRouter);
app.use("/admins", adminsRouter);
app.use("/drugs", drugsRouter);

export default app;
