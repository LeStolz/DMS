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
import { splitFullName } from "../../utils";
import {
  Appointment,
  Dentist,
  Schedule,
  Service,
  Treatment,
  User,
} from "../../types";
import Calendar from "../../components/calendar";
import Fail from "../../components/fail";

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
  try {
    const { dentistId, shift, date, userInfo } = req.body;
    const { user } = req;
    const userInfoFormat = JSON.parse(userInfo);
    let newUser = null;

    if (!user) {
      newUser = (
        await (await req.db())
          .input("name", userInfoFormat.name)
          .input("phone", userInfoFormat.phone)
          .input("gender", userInfoFormat.gender)
          .input("dob", userInfoFormat.dob)
          .input("address", userInfoFormat.address)
          .execute("createGuestPatient")
      ).recordset[0];
    }

    const appointment = (
      await (
        await req.db()
      )
        .input("dentistId", dentistId)
        .input("patientId", user ? user?.id : newUser?.id)
        .input("shift", shift)
        .input("date", date)
        .execute("bookAppointment")
    ).recordset[0];

    return res.send(
      <Success>
        Your booking has been recorded. We will contact you right away.
      </Success>
    );
  } catch (error) {
    if (error instanceof Error)
      return res.send(<Fail>{formatError(error.message)}</Fail>);
  }
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

usersRouter.get("/schedule/:date", patient, async (req, res) => {
  const date = req.params.date;
  let { listDentist, appointments, schedules, dentist } = req.query;

  if (!Array.isArray(appointments)) {
    appointments = [appointments as any];
  }

  if (!Array.isArray(schedules)) {
    schedules = [schedules as any];
  }

  const stringifiedDentists: string[] = listDentist as string[];
  const parsedDentists: Dentist[] = stringifiedDentists.map(
    (dentistStr: string) => JSON.parse(dentistStr) as Dentist
  );

  const stringifiedSchedules: string[] = schedules as string[];
  const parsedSchedules: Schedule[] = stringifiedSchedules.map(
    (scheduleStr: string) => JSON.parse(scheduleStr) as Schedule
  );

  const stringifiedAppointments: string[] = appointments as string[];
  const parsedAppointments: Appointment[] = stringifiedAppointments.map(
    (appointmentStr: string) => {
      const appointment: Appointment = JSON.parse(
        appointmentStr
      ) as Appointment;
      if (typeof appointment.date === "string") {
        appointment.date = new Date(appointment.date);
      }
      return appointment;
    }
  );

  return res.send(
    <Calendar
      dentist={dentist ? (dentist as string) : ""}
      date={date === "def" ? undefined : new Date(date)}
      schedules={parsedSchedules}
      dentists={parsedDentists}
      appointments={parsedAppointments}
    />
  );
});

usersRouter.get("/getDentistSchedules", async (req, res) => {
  try {
    const { dentist, listDentist } = req.query;
    const dentistSchedules = await (await req.db())
      .input("id", dentist)
      .execute("getDentistSchedules");
    const dentistAppointments = await (await req.db())
      .input("id", dentist)
      .execute("getDentistAppointments");

    const stringifiedDentists: string[] = listDentist as string[];
    const parsedDentists: Dentist[] = stringifiedDentists.map(
      (dentistStr: string) => JSON.parse(dentistStr) as Dentist
    );

    return res.send(
      <Calendar
        dentist={dentist as string}
        dentists={parsedDentists}
        schedules={dentistSchedules.recordset}
        appointments={dentistAppointments.recordset}
      />
    );
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).send(formatError(error.message));
  }
});

usersRouter.get("/bookAppointments", async (req, res) => {
  try {
    const { user } = req;
    const { date, dentist, shift } = req.query;
    const shiftConfirm = (shift as string).split("-");

    const dentistInfo = (
      await (await req.db()).input("id", dentist).execute("getDentistDetails")
    ).recordset[0];

    return res.send(
      <div class="row p-2">
        <div class="w-100 row p-0 m-0">
          <div class="col-6">
            <label for="phone" class="form-label">
              Phone
            </label>
            <input
              type="phone"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="0901234567"
              value={user?.phone ? user.phone : ""}
            />
          </div>
          <div class="col-6">
            <label for="dob" class="form-label">
              Date of birth
            </label>
            <input
              type="date"
              class="form-control"
              name="dob"
              id="dob"
              value={
                user?.dob?.toISOString().split("T")[0]
                  ? user?.dob?.toISOString().split("T")[0]
                  : ""
              }
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div class="w-100 row p-0 m-0 mb-3">
          <span class="form-text">
            You don't have to fill in the rest if you have booked an appointment
            before.
          </span>
        </div>
        <div class="w-100 row p-0 m-0 mb-3">
          <div class="col-6">
            <label for="first-name" class="form-label">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="first-name"
              placeholder="A"
              value={
                user?.name !== undefined
                  ? splitFullName(user?.name).firstName
                  : ""
              }
            />
          </div>
          <div class="col-6">
            <label for="last-name" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="last-name"
              placeholder="Nguyen Van"
              value={
                user?.name !== undefined
                  ? splitFullName(user?.name).lastName
                  : ""
              }
            />
          </div>
        </div>
        <div>
          <div class="d-flex">
            <div class="me-3">
              <p>Gender </p>
            </div>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  required=""
                  value="female"
                  checked={user?.gender === "female"}
                />
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  required=""
                  value="male"
                  checked={user?.gender === "male"}
                />
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">
            Address
          </label>
          <textarea class="form-control" name="address" id="address" rows="3">
            {user?.address ? user.address : ""}
          </textarea>
        </div>
        <div class="w-100 row p-0 m-0 mb-4">
          <div class="col-6">
            <label for="dentist-name" class="form-label">
              Dentist Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="dentist-name"
              readonly=""
              value={dentistInfo?.name}
            />
            <div class="id-dentist" id={dentistInfo?.id}></div>
          </div>
          <div class="col-6">
            <label for="doa" class="form-label">
              Date of appointment
            </label>
            <input
              readonly=""
              type="date"
              class="form-control"
              name="doa"
              id="doa"
              value={(date as string).trim()}
            />
          </div>
          <div class="shift" id={shiftConfirm[0]}></div>
        </div>
        <div class="d-grid gap-2">
          <button
            type="button"
            data-toggle="modal"
            data-dismiss="modal"
            data-target="#confirmInfoModal"
            onclick={`
              const phone = htmx.find('#phone').value
              const dob = htmx.find('#dob').value
              const firstName = htmx.find('#first-name').value
              const lastName = htmx.find('#last-name').value
              const address = htmx.find('#address').value
              const dentistName = htmx.find('#dentist-name').value
              const gender = htmx.find('input[name=gender]:checked').id
              const doa = htmx.find('#doa').value
              const dentistId = htmx.find('.id-dentist').id
              const shift = htmx.find('.shift').id

              document.querySelector('#phone1').value = phone
              document.querySelector('#dob1').value = dob
              document.querySelector('#first-name-1').value = firstName
              document.querySelector('#last-name-1').value = lastName
              document.querySelector('#address1').value = address
              document.querySelector('#dentist-name-1').value = dentistName
              document.querySelector('#doa1').value = doa
              document.querySelector('.id-dentist-1').id = dentistId
              document.querySelector('.shift1').id = shift
              
              gender === "male" ? document.querySelector('.form-check-input-1#male').checked = true:
              document.querySelector('.form-check-input-1#female').checked = true
          `}
            class="close btn btn-primary text-white fs-5 py-2 px-5 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
});

export default usersRouter;
