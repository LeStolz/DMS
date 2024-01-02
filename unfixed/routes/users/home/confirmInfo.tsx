import * as elements from "typed-html";
import { validateForm } from "../../../utils";
import { User } from "../../../types";
import Warning from "../../../components/warning";

const ConfirmInfo = ({ user }: { user: User | undefined }) => {
  if (user && user.role !== "patient" && user.role !== "staff") {
    return (
      <div
        class="modal fade"
        id="confirmInfoModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="confirmInfoModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header not-printable">
              <h5 class="modal-title" id="confirmInfoModalLabel">
                Confirm Info
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
            <div class="modal-body not-printable" id="confirmInfoModalBody">
              <Warning>
                You must be logged in as a Patient or Guest to perform this
                action.
              </Warning>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      class="modal fade"
      id="confirmInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header not-printable">
            <h5 class="modal-title" id="confirmInfoModalLabel">
              Confirm Info
            </h5>
            <div class="d-flex align-items-center gap-3">
              <button
                class="btn btn-outline-primary"
                type="button"
                onclick="
                  window.print();
                  htmx.addClass(htmx.find('#confirmInfoModal'), 'show');
                "
              >
                <i class="bi bi-printer"></i>
              </button>
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
          <div class="modal-body printable" id="confirmInfoModalBody">
            <form
              class="row p-2 needs-validation"
              hx-post="/users/makeAppointment"
              hx-target="#confirmInfoModal .modal-body"
              hx-target-error="#book-error"
              novalidate
              hx-on={validateForm(false, "book-error")}
            >
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="phone" class="form-label">
                    Phone
                  </label>
                  <input
                    type="phone"
                    class="form-control"
                    pattern="[0-9]{10}"
                    name="phone"
                    id="phone"
                    value={user ? user.phone : ""}
                    readonly=""
                    required=""
                  />
                  <div class="invalid-feedback">
                    Phone must contain only digits and have a length of 10.
                  </div>
                </div>
                <div class="col-6">
                  <label for="dob" class="form-label">
                    Date of birth
                  </label>
                  <input
                    required=""
                    max={new Date().toISOString().split("T")[0]}
                    readonly=""
                    type="date"
                    class="form-control"
                    name="dob"
                    id="dob"
                    value={
                      user?.dob ? user.dob.toISOString().split("T")[0] : ""
                    }
                  />
                  <div class="invalid-feedback">
                    Date of birth must be before today.
                  </div>
                </div>
              </div>
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="first-name" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="firstName"
                    id="first-name"
                    value={user ? user.name.split(" ").at(-1) : ""}
                    readonly=""
                    required=""
                  />
                  <div class="invalid-feedback">First name is required.</div>
                </div>
                <div class="col-6">
                  <label for="last-name" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="lastName"
                    id="last-name"
                    value={
                      user ? user.name.split(" ").slice(0, -1).join(" ") : ""
                    }
                    readonly=""
                    required=""
                  />
                  <div class="invalid-feedback">Last name is required.</div>
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
                        readonly=""
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        required=""
                        id="female"
                        value="female"
                        checked={user != null && user?.gender === "female"}
                      />
                      <label class="form-check-label" for="female">
                        Female
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        readonly=""
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        required=""
                        value="male"
                        checked={user != null && user?.gender === "male"}
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
                <textarea
                  readonly="readonly"
                  class="form-control"
                  name="address"
                  id="address"
                  rows="3"
                  required=""
                >
                  {user && user.address}
                </textarea>
                <div class="invalid-feedback">Address is required.</div>
              </div>
              <div class="w-100 row p-0 m-0 mb-4">
                <div class="col-6">
                  <label for="dentist-name" class="form-label">
                    Dentist Name
                  </label>
                  <input
                    readonly=""
                    type="text"
                    class="form-control"
                    name="dentistName"
                    id="dentist-name"
                    value="Not picked yet"
                  />
                  <input
                    readonly=""
                    type="hidden"
                    class="form-control"
                    name="dentistId"
                    id="dentist-id"
                  />
                </div>
                <div class="col-6">
                  <label for="doa" class="form-label">
                    Date of appointment
                  </label>
                  <p id="doa" class="m-0 py-2 fw-bold">
                    Not picked yet
                  </p>
                  <input
                    type="hidden"
                    class="form-control"
                    name="date"
                    id="date"
                  />
                  <input
                    type="hidden"
                    class="form-control"
                    name="shift"
                    id="shift"
                  />
                </div>
              </div>
              <div class="d-flex gap-3 not-printable">
                {user == null || user.role == "staff" ? (
                  <button
                    type="button"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#contactInfoModal"
                    class="btn btn-danger text-white flex-grow-1 fs-5 py-2 rounded-md"
                  >
                    Back
                  </button>
                ) : (
                  ""
                )}
                <button class="btn btn-primary text-white d-flex justify-content-center align-items-end flex-grow-1 fs-5 py-2 rounded-md">
                  Book Now!
                  <div class="position-relative">
                    <span
                      class="htmx-indicator spinner-border spinner-border-sm position-absolute"
                      style="left: 0.4rem; bottom: 0.4rem"
                      role="status"
                    />
                    <span
                      id="status"
                      class="position-absolute"
                      role="status"
                    ></span>
                  </div>
                </button>
              </div>
              <div
                id="book-error"
                class="not-printable invalid-feedback d-block"
              ></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInfo;
