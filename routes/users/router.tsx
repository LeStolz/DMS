import { Router } from "express";
import * as elements from "typed-html";
import Home from "./home/home";
import Success from "../../components/success";
import { dentist, patient } from "../auth/router";
import Topbar from "../../components/topbar";
import ProfileSettings from "../../components/profileSettings";
import TreatmentHistory from "../../components/treatmentHistory";
import Warning from "../../components/warning";
import { formatError, parseSqlJson } from "../../utils";
import { Dentist, Service, Treatment, User } from "../../types";

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
  let treatments: Treatment[] = [];

  try {
    const patientDetails = await parseSqlJson(
      (
        await (await req.db())
          .input("id", req.user?.id)
          .execute("getPatientDetails")
      ).recordset[0]
    );

    treatments = patientDetails.treatments;
  } catch {
    return res.send(
      <Topbar user={req.user}>
        <Warning fullscreen>
          You must be logged in as a patient to view your profile.
        </Warning>
      </Topbar>
    );
  }

  return res.send(
    <Topbar user={req.user}>
      <div>
        <ProfileSettings user={req.user!} />
        <TreatmentHistory treatments={treatments} />
      </div>
    </Topbar>
  );
});

usersRouter.post("/makeAppointment", async (req, res) => {
  return res.send(
    <Success>
      Your booking has been recorded. We will contact you right away.
    </Success>
  );
});

usersRouter.put("/updatePatient", patient, async (req, res) => {
  try {
    const input = req.body;

    const user: User = (
      await (await req.db())
        .input("id", req.user?.id)
        .input("name", `${input.lastName} ${input.firstName}`)
        .input("phone", input.phone)
        .input("gender", input.gender)
        .input("dob", input.dob)
        .input("address", input.address)
        .execute("updatePatient")
    ).recordset[0];

    if (user.phone !== req.user?.phone) {
      return res.header("HX-Redirect", "/users").end();
    }

    return res.send(<i class="bi bi-check-lg"></i>);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }
});

export default usersRouter;
