import { Router } from "express";
import * as elements from "typed-html";
import { admin, dentist, patient, staff } from "../auth/router";

const usersRouter = Router();

usersRouter.get("/guest", async (req, res) => {
  return res.send(<p>Guest</p>);
});

usersRouter.get("/patient", patient, async (req, res) => {
  return res.send(<p>Patient</p>);
});

usersRouter.get("/dentist", dentist, async (req, res) => {
  return res.send(<p>Dentist</p>);
});

usersRouter.get("/staff", staff, async (req, res) => {
  return res.send(<p>Staff</p>);
});

usersRouter.get("/admin", admin, async (req, res) => {
  return res.send(<p>Admin</p>);
});

export default usersRouter;
