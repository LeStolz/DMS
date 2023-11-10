import { Router } from "express";
import * as elements from "typed-html";
import SignIn from "../../layouts/signin";
import Login from "../../layouts/login";

const identityRouter = Router();

identityRouter.get("/signin", async (req, res) => {
  return res.send(<SignIn />);
});

identityRouter.get("/login", async (req, res) => {
  return res.send(<Login />);
});

export default identityRouter;
