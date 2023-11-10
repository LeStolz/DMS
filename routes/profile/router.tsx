import { Router } from "express";
import * as elements from "typed-html";
import Profile from "../../layouts/profile/profile";

const profileRouter = Router();

profileRouter.get("/", async (req, res) => {
  return res.send(<Profile />);
});

export default profileRouter;
