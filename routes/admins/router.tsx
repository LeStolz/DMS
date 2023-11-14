import { Router } from "express";
import * as elements from "typed-html";
import Users from "./users";
import Topbar from "../../components/topbar";
import { admin } from "../auth/router";

const adminRouter = Router();

adminRouter.get("/users", admin, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Users />
    </Topbar>
  );
});

export default adminRouter;
