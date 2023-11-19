import { Router } from "express";
import * as elements from "typed-html";
import Patients from "./patients";
import AddTreatment from "./addTreatment";
import Schedule from "./schedule";
import Topbar from "../../components/topbar";
import Success from "../../components/success";
import { dentist } from "../auth/router";

const dentistsRouter = Router();

dentistsRouter.get("/patients", dentist, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Patients />
    </Topbar>
  );
});

dentistsRouter.get("/schedule", dentist, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Schedule />
    </Topbar>
  );
});

dentistsRouter.get("/addTreatment", dentist, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <AddTreatment />
    </Topbar>
  );
});

dentistsRouter.post("/addTreatment", dentist, async (req, res) => {
  return res.send(
    <Success fullscreen>Your treatment has been recorded.</Success>
  );
});

export default dentistsRouter;
