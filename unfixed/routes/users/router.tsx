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
import {
  Appointment,
  Dentist,
  Schedule,
  Service,
  Treatment,
  User,
} from "../../types";
import Calendar from "../../components/calendar";
import ContactInfo from "./home/contactInfo";

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
  const {
    firstName,
    lastName,
    phone,
    gender,
    dob,
    address,
    date,
    shift,
    dentistId,
  } = req.body;
  let user: User | undefined = req.user;

  if (!date || !shift)
    return res.status(400).send("Please pick an appointment date.");
  if (!dentistId || dentistId == "any")
    return res.status(400).send("Please pick a dentist.");

  if (user == null || user.role != "patient") {
    if (!firstName) return res.status(400).send("First name is required.");
    if (!lastName) return res.status(400).send("Last name is required.");
    if (!phone) return res.status(400).send("Phone is required.");
    if (!gender) return res.status(400).send("Gender is required.");
    if (!dob) return res.status(400).send("Date of Birth is required.");
    if (!address) return res.status(400).send("Address is required.");

    try {
      user = (
        await (await req.db())
          .input("name", `${lastName} ${firstName}`)
          .input("phone", phone)
          .input("gender", gender)
          .input("dob", dob)
          .input("address", address)
          .execute("createGuestPatient")
      ).recordset[0];
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(formatError(error.message));
      }

      return res.status(500).send("Update failed. Please try again later.");
    }
  }

  try {
    await (await req.db())
      .input("dentistId", dentistId)
      .input("patientId", user!.id)
      .input("shift", shift)
      .input("date", date)
      .execute("bookAppointment");
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }

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

usersRouter.post("/dentistsOnShift/:startDate", async (req, res) => {
  const { startDate } = req.params;
  let { date, shift, dentistId } = req.body;
  let dentists: Dentist[] = [];

  try {
    dentists = (
      await (await req.db())
        .input("date", date)
        .input("shift", shift)
        .execute("getDentistsOnShift")
    ).recordset;
  } catch {}

  return res.send(
    <select
      name="dentistId"
      id="dentistSelect"
      class="form-select form-select-lg max-w-xs vw-100"
      hx-include="#dentistSelect, #date-select, #shift-select"
      hx-post={`/users/schedule/${startDate}`}
      hx-target="#calendar"
    >
      <option value="any">Any</option>
      {dentists.map((dentist) =>
        dentist.id === dentistId ? (
          <option selected="" value={dentist.id}>
            {dentist.name}
          </option>
        ) : (
          <option value={dentist.id}>{dentist.name}</option>
        )
      )}
    </select>
  );
});

usersRouter.post("/fillinfo", async (req, res) => {
  const { currentDate, currentShift, dentistId } = req.body;

  if (!currentDate || !currentShift || !dentistId || dentistId === "any") {
    return res.send(
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactInfoModalLabel">
            Contact Info
          </h5>
          <div class="d-flex align-items-center gap-3">
            <button
              type="button"
              class="close btn btn-light icon-h-sm icon-w-sm border-0 rounded-circle"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <Warning>Please pick a dentist and a date.</Warning>
        </div>
      </div>
    );
  }

  const { id, name } = (
    await (await req.db()).input("id", dentistId).execute("getDentistDetails")
  ).recordset[0];

  return res.send(
    <ContactInfo
      dentistId={id}
      dentistName={name}
      date={currentDate}
      shift={currentShift}
    />
  );
});

usersRouter.post("/schedule/:date", async (req, res) => {
  let dentists: Dentist[] = [];
  let schedules: Schedule[] = [];
  let appointments: Appointment[] = [];
  const { date } = req.params;
  const { dentistId, currentDate, currentShift } = req.body;

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

  if (dentistId === "any") {
    schedules = (
      await Promise.all(
        dentists.map(async (dentist) => {
          try {
            return (
              await (await req.db())
                .input("id", dentist.id)
                .execute("getDentistSchedules")
            ).recordset as Schedule[];
          } catch {
            return [];
          }
        })
      )
    ).flat();

    appointments = (
      await Promise.all(
        dentists.map(async (dentist) => {
          try {
            return (
              await (await req.db())
                .input("id", dentist.id)
                .execute("getDentistAppointments")
            ).recordset as Appointment[];
          } catch {
            return [];
          }
        })
      )
    ).flat();

    if (currentDate && currentShift) {
      dentists = (
        await (await req.db())
          .input("date", currentDate)
          .input("shift", currentShift)
          .execute("getDentistsOnShift")
      ).recordset;
    }
  } else {
    try {
      schedules = (
        await (await req.db())
          .input("id", dentistId)
          .execute("getDentistSchedules")
      ).recordset;
    } catch {}

    try {
      appointments = (
        await (await req.db())
          .input("id", dentistId)
          .execute("getDentistAppointments")
      ).recordset;
    } catch {}
  }

  return res.send(
    <Calendar
      user={req.user}
      currentDate={new Date(currentDate)}
      currentShift={currentShift}
      currentDentistId={dentistId}
      dentists={dentists}
      date={date === "def" ? undefined : new Date(date)}
      schedules={schedules}
      appointments={appointments}
    />
  );
});

export default usersRouter;
