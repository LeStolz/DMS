import { Router } from "express";
import * as elements from "typed-html";
import Topbar from "../../components/topbar";
import { admin, patient } from "../auth/router";
import Drugs from "./drugs";

const drugsRouter = Router();

drugsRouter.get("/drugs", patient, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Drugs />
    </Topbar>
  );
});

drugsRouter.get("/drugs-scrud", admin, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Drugs scrud />
    </Topbar>
  );
});

export default drugsRouter;
