import { Router } from "express";
import * as elements from "typed-html";
import Home from "./home/home";
import Success from "../../components/success";
import Profile from "./profile/profile";
import { patient } from "../auth/router";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  return res.send(<Home user={req.user} />);
});

usersRouter.get("/profile", patient, async (req, res) => {
  // Use req.user.id to call getPatientDetails

  return res.send(<Profile user={req.user} />);
});

usersRouter.post("/makeAppointment", async (req, res) => {
  return res.send(
    <Success>
      Your booking has been recorded. We will contact you right away.
    </Success>
  );
});

usersRouter.put("/updatePatient", patient, async (req, res) => {
  // Use req.user.id to call updatePatient
});

export default usersRouter;
