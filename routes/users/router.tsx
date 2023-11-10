import { Router } from "express";
import * as elements from "typed-html";
import { admin, dentist, patient, staff } from "../auth/router";
import Client from "../../layouts/client/client";
import Service from "../../layouts/room/service";
import Dentists from "../../layouts/room/dentists";
import Home from "../../layouts/client/home";

const usersRouter = Router();

usersRouter.get("/guest", async (req, res) => {
  return res.send(<Home />);
});

usersRouter.get("/guest/service", async (req, res) => {
  return res.send(<Service />);
});

usersRouter.get("/guest/dentist", async (req, res) => {
  return res.send(<Dentists />);
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
