import * as elements from "typed-html";
import Dentist from "./dentist";
import ScheduleItem from "./scheduleItem";

const trashData = [
  {
    date: "10/10/2015",
    time: "8h30",
    session: "Morning",
    status: "Unbooked",
  },
  {
    date: "10/01/2005",
    time: "16h30",
    session: "Afternoon",
    status: "Unbooked",
  },
  {
    date: "09/10/2004",
    time: "20h30",
    session: "Evening",
    status: "Booked",
  },
];

const Schedule = () => {
  return (
    <Dentist>
      <div class="col-xl-8 ms-16 container pt-4">
        <div>
          <div>
            <h1>Schedule</h1>
          </div>
          <div class="my-3">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Schedule
              <i class="bi bi-plus-circle"></i>
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Schedule
                    </h5>
                    <button
                      type="button"
                      class="close h-8 w-8 border-none rounded-circle"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="date" class="form-label">
                          Date
                        </label>
                        <input type="date" id="date" class="form-control" />
                      </div>
                      <div class="mb-3">
                        <label for="shift" class="form-label">
                          Shift
                        </label>
                        <select
                          class="form-select"
                          id="shift"
                          aria-label="Default select example"
                        >
                          <option value="1">Morning</option>
                          <option value="2">Afternoon</option>
                          <option value="3">Evening</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Shift</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {trashData.map((item, key) => (
                <ScheduleItem
                  date={item.date}
                  time={item.time}
                  status={item.status}
                  id={key}
                  session={item.session}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dentist>
  );
};

export default Schedule;
