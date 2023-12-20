import * as elements from "typed-html";
import { Appointment, Schedule } from "../types";
import { capitalize, formatDate } from "../utils";

type ScheduleProps = {
  date?: Date;
  schedules?: Schedule[];
  appointments?: Appointment[];
};

const Calendar = ({
  date,
  schedules = [],
  appointments = [],
}: ScheduleProps) => {
  if (date == undefined) {
    date = new Date();
    date.setDate(date.getDate() - date.getDay());
    date = new Date(date.toISOString().split("T")[0]);
  }

  const shifts = ["morning", "afternoon", "evening"];
  let cnt = 0;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, idx) => {
      const weekdayDate = new Date(date!);
      weekdayDate.setDate(date!.getDate() + cnt);

      if (
        weekdayDate.getDay() > idx ||
        weekdayDate.getMonth() != date!.getMonth()
      ) {
        return { day };
      } else {
        cnt++;
      }

      return {
        day,
        date: weekdayDate,
      };
    }
  );

  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + cnt);
  if (nextDate.getDate() < date.getDate()) {
    nextDate.setDate(1);
  }

  const prevDate = new Date(date);
  if (prevDate.getDate() === 1) {
    if (cnt === 7) {
      prevDate.setDate(date.getDate() - 7);
    } else {
      prevDate.setDate(date.getDate() - (7 - cnt));
    }
  } else {
    prevDate.setDate(Math.max(date.getDate() - 7, 1));
  }

  return (
    <div id="calendar" class="text-center p-0 m-0">
      <div>
        <div class="d-block d-md-flex justify-content-around p-3 bg-white w-100 border-bottom border-secondary">
          <div>
            <div class="text-center">
              <p class={`lead mb-3`}>Please pick a Dentist</p>
            </div>
            <div class="d-flex justify-content-center align-items-center m-3">
              <select
                name="dentist"
                id="dentistSelect"
                class="form-select form-select-lg"
              >
                <option value="0">Any</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div>
            <div class="text-center">
              <p class={`lead mb-3`}>Please pick a Date</p>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <a
                role="button"
                type="button"
                hx-get={`/users/schedule/${
                  prevDate.toISOString().split("T")[0]
                }`}
                hx-target="#calendar"
                class="btn btn-dark icon-h-sm icon-w-sm rounded-circle"
              >
                <i class="bi bi-arrow-left"></i>
              </a>
              <div>
                <h2 class="text-center m-0 mx-5"> {formatDate(date)} </h2>
              </div>
              <a
                role="button"
                type="button"
                hx-get={`/users/schedule/${
                  nextDate.toISOString().split("T")[0]
                }`}
                hx-target="#calendar"
                class="btn btn-dark icon-h-sm icon-w-sm rounded-circle"
              >
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <form>
          <div class="row gap-1 bg-white m-0 p-4 d-flex justify-content-center">
            <div class="d-none d-lg-block col-auto">
              <div class="row mb-1 datetime text-white">
                <p>+</p>
              </div>
              {shifts.map((shift) => (
                <div class="row mb-1 icon-h-lg datetime text-secondary text-end p-0 m-0 d-flex justify-content-center align-items-center">
                  <p class="m-0">{capitalize(shift)}</p>
                </div>
              ))}
            </div>
            {weekdays.map((weekday, weekdayIdx) => (
              <div class="col-auto">
                <div class="row mb-1 datetime text-primary">
                  <p>{weekday.day}</p>
                </div>
                {shifts.map((shift) => (
                  <div id={`form-${shift}-${weekdayIdx}`} class="row mb-1">
                    <input type="hidden" name="shift" value={shift} />
                    <input
                      type="hidden"
                      name="day"
                      value={(weekdayIdx + 1).toString()}
                    />
                    <input
                      type="hidden"
                      name="disabled"
                      value={
                        appointments.find((appointment) => {
                          if (
                            appointment.date.getTime() ===
                              weekday.date?.getTime() &&
                            appointment.shift === shift
                          ) {
                            return false;
                          }

                          if (
                            appointment.date.getDay() === weekdayIdx &&
                            appointment.shift === shift &&
                            appointment.date.getTime() >= new Date().getTime()
                          ) {
                            return true;
                          }

                          return false;
                        }) != null || weekday.date == null
                          ? "true"
                          : "false"
                      }
                    />
                    <input
                      type="radio"
                      class="btn-check"
                      name="date"
                      id={`${shift}-${weekday.day}`}
                      disabled={
                        appointments.find((appointment) => {
                          if (
                            appointment.date.getTime() ===
                              weekday.date?.getTime() &&
                            appointment.shift === shift
                          ) {
                            return false;
                          }

                          if (
                            appointment.date.getDay() === weekdayIdx &&
                            appointment.shift === shift &&
                            appointment.date.getTime() >= new Date().getTime()
                          ) {
                            return true;
                          }

                          return false;
                        }) != null || weekday.date == null
                      }
                      checked={
                        schedules.find(
                          (schedule) =>
                            schedule.date === weekdayIdx + 1 &&
                            schedule.shift === shift
                        ) != null && weekday.date != null
                      }
                    />
                    <label
                      class={`btn icon-w-lg icon-h-lg position-relative d-flex justify-content-center align-items-center`}
                      for={`${shift}-${weekday.day}`}
                    >
                      <span>
                        <i class="d-none d-lg-block bi bi-plus fs-2"></i>
                        {shift === "morning" ? (
                          <i class="d-block d-lg-none bi bi-sunrise fs-2"></i>
                        ) : shift === "afternoon" ? (
                          <i class="d-block d-lg-none bi bi-sun fs-2"></i>
                        ) : (
                          <i class="d-block d-lg-none bi bi-sunset fs-2"></i>
                        )}
                      </span>
                      <span class="position-absolute bottom-0 end-0 me-1">
                        {weekday.date ? weekday.date.getDate() : ""}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div class="p-4 bg-white w-100 border-top border-secondary d-flex justify-content-around">
            <button
              type="reset"
              class="btn btn-danger text-white fs-5 py-2 px-5 rounded-md"
            >
              Clear Selection
            </button>

            <button
              type="button"
              class="btn btn-primary fs-5 py-2 px-5 rounded-md"
              data-toggle="modal"
              data-target="#contactInfoModal"
            >
              Book Now!
            </button>
          </div>
        </form>
      </div>
      <span id="error" class="invalid-feedback d-block"></span>
    </div>
  );
};

export default Calendar;
