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
  // Use req.user.id to call getDentistSchedules
  // Use req.user.id to call getDentistAppointments
  // Use req.user.id to call addDentistSchedule
  // Use req.user.id to call removeDentistSchedule
  return res.send(
    <Topbar user={req.user}>
      <Schedule />
    </Topbar>
  );
});

dentistsRouter.get("/addTreatment", dentist, async (req, res) => {
  // Use req.user.id to call getDentistAppointments
  return res.send(
    <Topbar user={req.user}>
      <AddTreatment />
    </Topbar>
  );
});

dentistsRouter.post("/addTreatment", dentist, async (req, res) => {
  // Use req.user.id to call getDentistAppointments
  // This should be the only endpoint to handle adding treatments to ensure atomicity
  // i.e., it calls addTreatment, addDrugToTreatment, addServiceToTreatment all at the same time
  return res.send(
    <Success fullscreen>Your treatment has been recorded.</Success>
  );
});

export default dentistsRouter;
