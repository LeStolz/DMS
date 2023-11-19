import { randomInt } from "crypto";
import * as elements from "typed-html";

function formatDate(date: Date) {
  const dateString = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
  });
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

const Calendar = () => {
  let date = new Date();
  date.setDate(1);
  date.setDate((8 - date.getDay()) % 7);

  const shifts = ["Morning", "Afternoon", "Evening"];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, idx) => {
      const weekdayDate = new Date();
      weekdayDate.setDate(date.getDate() + idx);

      return {
        day,
        date: weekdayDate,
      };
    }
  );

  return (
    <form>
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
            <button class="btn btn-dark icon-h-sm icon-w-sm rounded-circle">
              <i class="bi bi-arrow-left"></i>
            </button>
            <div>
              <h2 class="text-center mx-5"> {formatDate(date)} </h2>
            </div>
            <button class="btn btn-dark icon-h-sm icon-w-sm rounded-circle">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row gap-1 bg-white m-0 p-4 d-flex justify-content-center">
        <div class="d-none d-lg-block col-auto">
          <div class="row mb-1 datetime text-white">
            <p>+</p>
          </div>
          {shifts.map((shift) => (
            <div class="row mb-1 icon-h-lg datetime text-secondary text-end p-0 m-0 d-flex justify-content-center align-items-center">
              <p class="m-0">{shift}</p>
            </div>
          ))}
        </div>
        {weekdays.map((weekday) => (
          <div class="col-auto">
            <div class="row mb-1 datetime text-primary">
              <p>{weekday.day}</p>
            </div>
            {shifts.map((shift) => (
              <div class="row mb-1">
                <input
                  type="radio"
                  class="btn-check"
                  name="date"
                  id={`${shift}-${weekday.day}`}
                  disabled={randomInt(0, 2) === 1}
                />
                <label
                  class="btn icon-w-lg icon-h-lg d-flex position-relative justify-content-center align-items-center"
                  for={`${shift}-${weekday.day}`}
                >
                  <i class="d-none d-lg-block bi bi-plus fs-2"></i>
                  {shift === "Morning" ? (
                    <i class="d-block d-lg-none bi bi-sunrise fs-2"></i>
                  ) : shift === "Afternoon" ? (
                    <i class="d-block d-lg-none bi bi-sun fs-2"></i>
                  ) : (
                    <i class="d-block d-lg-none bi bi-sunset fs-2"></i>
                  )}
                  <span class="position-absolute bottom-0 end-0 me-1">
                    {weekday.date.getDate()}
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
          class="btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
        >
          Clear Selection
        </button>

        <button
          type="button"
          class="btn btn-primary fw-bold fs-5 py-2 px-5 rounded-md"
          data-toggle="modal"
          data-target="#contactInfoModal"
        >
          Book Now!
        </button>
      </div>
    </form>
  );
};

export default Calendar;
