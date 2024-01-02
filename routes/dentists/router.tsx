import { Router } from "express";
import * as elements from "typed-html";
import AddTreatment from "./addTreatment";
import Schedule from "./schedule";
import Topbar from "../../components/topbar";
import Success from "../../components/success";
import { dentist } from "../auth/router";
import Users from "./patients/users";
import {
  Appointment,
  Drug,
  Schedule as ScheduleType,
  Service,
  Treatment,
  User,
} from "../../types";
import SearchResult from "./patients/searchResult";
import { formatError, parseSqlJson } from "../../utils";
import Warning from "../../components/warning";
import AddDrug from "./addDrug";
import ProfileSettings from "../../components/profileSettings";
import TreatmentHistory from "../../components/treatmentHistory";

const dentistsRouter = Router();

dentistsRouter.get("/patients", dentist, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Users />
    </Topbar>
  );
});

dentistsRouter.post("/search", dentist, async (req, res) => {
  const { phone } = req.body;
  let users: User[] = [];

  try {
    users = (
      await (await req.db()).input("phone", phone).execute("getPatientsByPhone")
    ).recordset;
  } catch (error: any) {
    return res.send(
      <tbody id="user-search-result">
        <tr class="text-center">
          <td colspan={5}>No patient found</td>
        </tr>
      </tbody>
    );
  }

  return res.send(<SearchResult users={users} />);
});

dentistsRouter.put("/updatePatient/:userId", dentist, async (req, res) => {
  try {
    const input = req.body;

    const user: User = (
      await (await req.db())
        .input("id", req.params.userId)
        .input("name", `${input.lastName} ${input.firstName}`)
        .input("phone", input.phone)
        .input("gender", input.gender)
        .input("dob", input.dob)
        .input("address", input.address)
        .execute("updatePatient")
    ).recordset[0];

    return res.send(<i class="bi bi-check-lg"></i>);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }
});

dentistsRouter.get("/profile/:userId", dentist, async (req, res) => {
  let treatments: Treatment[] = [];
  let patient: User;

  try {
    const patientDetails = await parseSqlJson(
      (
        await (await req.db())
          .input("id", req.params.userId)
          .execute("getPatientDetails")
      ).recordset[0]
    );

    patient = patientDetails.patient;
    patient.id = req.params.userId;
    treatments = patientDetails.treatments;
  } catch {
    return res.send(
      <Topbar user={req.user}>
        <Warning fullscreen>User not found.</Warning>
      </Topbar>
    );
  }

  return res.send(
    <Topbar user={req.user}>
      <div>
        <ProfileSettings user={patient} isDentist />
        <TreatmentHistory treatments={treatments} />
      </div>
    </Topbar>
  );
});

dentistsRouter.get("/addTreatment", dentist, async (req, res) => {
  let services: Service[] = [];
  let drugs: Drug[] = [];

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

  try {
    drugs = (await (await req.db()).input("name", "").execute("getDrugs"))
      .recordset;
    drugs = await Promise.all(
      drugs.map(
        async (drug) =>
          await parseSqlJson(
            (
              await (await req.db())
                .input("id", drug.id)
                .execute("getDrugDetails")
            ).recordset[0]
          )
      )
    );
  } catch {}

  return res.send(
    <Topbar user={req.user}>
      <AddTreatment dentist={req.user!} services={services} drugs={drugs} />
    </Topbar>
  );
});

dentistsRouter.post("/addDrug", dentist, async (req, res) => {
  return res.send(<AddDrug drug={req.body} />);
});

dentistsRouter.post("/addTreatment", dentist, async (req, res) => {
  const {
    shift,
    date,
    toothTreated,
    notes,
    symptoms,
    outcome,
    treatmentCharge,
    serviceId,
    drugId,
    expirationDate,
    dosage,
    quantity,
  } = req.body;

  let { treatmentId } = req.body;

  try {
    if (treatmentId == null || !treatmentId) {
      treatmentId = (
        await (await req.db())
          .input("dentistId", req.user?.id)
          .input("shift", shift)
          .input("date", date)
          .input("symptoms", symptoms)
          .input("notes", notes)
          .input("toothTreated", toothTreated)
          .input("outcome", outcome)
          .input("treatmentCharge", treatmentCharge)
          .execute("createTreatment")
      ).recordset[0].id;
    }

    const serviceIds = Array.isArray(serviceId) ? serviceId : [serviceId];
    await (async () => {
      for (let serviceId of serviceIds) {
        try {
          await (await req.db())
            .input("treatmentId", treatmentId)
            .input("serviceId", serviceId)
            .execute("addServiceToTreatment");
        } catch {}
      }
    })();

    const drugIds = Array.isArray(drugId)
      ? drugId.map((_, idx) => ({
          drugId: drugId[idx],
          expirationDate: expirationDate[idx],
          dosage: dosage[idx],
          quantity: quantity[idx],
        }))
      : [{ drugId, expirationDate, dosage, quantity }];

    await Promise.all(
      drugIds.map(async (drug) => {
        try {
          await (await req.db())
            .input("treatmentId", treatmentId)
            .input("drugId", drug.drugId)
            .input("expirationDate", drug.expirationDate)
            .input("dosage", drug.dosage)
            .input("quantity", drug.quantity)
            .execute("addDrugToTreatment");
        } catch (error: any) {
          if (error instanceof Error) {
            if (
              error.message.includes("Drug does not exist.") ||
              error.message.includes("Drug batch does not exist.") ||
              error.message.includes("out of stock")
            ) {
              throw error;
            }
          }
        }
      })
    );

    await (await req.db()).input("id", treatmentId).execute("saveTreatment");

    return res.send(
      <Success fullscreen>Your treatment has been recorded.</Success>
    );
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes("appointment")) {
        return res.status(400).send(
          <div>
            Please recheck.
            <div
              id="appointment-error"
              class="invalid-feedback d-block"
              hx-swap-oob="true"
            >
              {formatError(error.message)}
            </div>
            <div id="drug-error" hx-swap-oob="true"></div>
          </div>
        );
      }

      if (error.message.toLowerCase().includes("drug")) {
        return res.status(400).send(
          <div>
            Please recheck.
            <input type="hidden" name="treatmentId" value={treatmentId} />
            <div
              id="drug-error"
              class="invalid-feedback d-block"
              hx-swap-oob="true"
            >
              {formatError(error.message)}
            </div>
            <div id="appointment-error" hx-swap-oob="true"></div>
          </div>
        );
      }

      return res.status(400).send(formatError(error.message));
    }

    return res
      .status(500)
      .send("Create treatment failed. Please try again later.");
  }
});

dentistsRouter.get("/schedule/:date", dentist, async (req, res) => {
  let schedules: ScheduleType[] = [];
  let appointments: Appointment[] = [];

  const date = req.params.date;

  try {
    schedules = (
      await (await req.db())
        .input("id", req.user?.id)
        .execute("getDentistSchedules")
    ).recordset;
  } catch {}

  try {
    appointments = (
      await (await req.db())
        .input("id", req.user?.id)
        .execute("getDentistAppointments")
    ).recordset;
  } catch {}

  return res.send(
    <Topbar user={req.user}>
      <Schedule
        date={date === "def" ? undefined : new Date(date)}
        schedules={schedules}
        appointments={appointments}
      />
    </Topbar>
  );
});

dentistsRouter.post("/alterSchedule", dentist, async (req, res) => {
  if (req.body.disabled !== "false") {
    return res.send();
  }

  try {
    if (req.body.date == null) {
      await (await req.db())
        .input("id", req.user?.id)
        .input("date", req.body.day)
        .input("shift", req.body.shift)
        .execute("addDentistSchedule");
    } else {
      await (await req.db())
        .input("id", req.user?.id)
        .input("date", req.body.day)
        .input("shift", req.body.shift)
        .execute("removeDentistSchedule");
    }
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }

  return res.send();
});

export default dentistsRouter;
