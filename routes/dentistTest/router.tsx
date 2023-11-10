import { Router } from "express";
import * as elements from "typed-html";
import Dentist from "../../layouts/dentist/dentist";
import FormAddPatient from "../../layouts/dentist/formAddPatient";
import Patient from "../../layouts/dentist/patients";
import PatientDetail from "../../layouts/dentist/patientDetail";
import Schedule from "../../layouts/dentist/schedule";

const dentistRouter = Router();

dentistRouter.get("/", async (req, res) => {
  return res.send(<Dentist />);
});

dentistRouter.get("/new-patient", async (req, res) => {
  return res.send(<FormAddPatient />);
});

dentistRouter.get("/patients", async (req, res) => {
  return res.send(<Patient />);
});

dentistRouter.get("/schedule", async (req, res) => {
  return res.send(<Schedule />);
});

dentistRouter.get("/patient-detail", async (req, res) => {
  return res.send(<PatientDetail />);
});

export default dentistRouter;
