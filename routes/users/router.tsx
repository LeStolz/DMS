import { Router } from "express";
import * as elements from "typed-html";
import Home from "./home/home";
import Success from "../../components/success";
import Profile from "./profile/profile";
import { patient } from "../auth/router";
import { Dentist } from "./home/dentist";
import { Service } from "./home/service";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  let dentists: Dentist[] = [];
  let services: Service[] = [];

  try {
    dentists = (await (await req.db()).execute("getDentists")).recordset;
    dentists = await Promise.all(
      dentists.map(
        async (dentist) =>
          (
            await (await req.db())
              .input("id", dentist.id)
              .execute("getDentistDetails")
          ).recordset[0]
      )
    );
  } catch {}

  try {
    services = (await (await req.db()).execute("getServices")).recordset;
    services = await Promise.all(
      services.map(
        async (service) =>
          (
            await (await req.db())
              .input("id", service.id)
              .execute("getServiceDetails")
          ).recordset[0]
      )
    );
  } catch {}

  return res.send(
    <Home user={req.user} dentists={dentists} services={services} />
  );
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
