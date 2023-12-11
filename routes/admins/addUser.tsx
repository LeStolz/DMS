import * as elements from "typed-html";
import { validateForm } from "../../utils";

const AddUser = () => {
  return (
    <div
      class="modal fade"
      id="addUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="addUserModalLabel">
              Add User
            </h4>
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
            <form
              hx-post="/admins/addUser"
              hx-target="#user-search-result"
              hx-swap="afterbegin"
              hx-target-error="#error"
              class="needs-validation"
              novalidate
              hx-on={validateForm(true)}
            >
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="phone" class="form-label">
                      Phone
                    </label>
                    <input
                      type="phone"
                      pattern="[0-9]{10}"
                      class="form-control"
                      name="phone"
                      id="phone"
                      placeholder="0901234567"
                      required=""
                    />
                    <div class="invalid-feedback">
                      Phone must contain only digits and have a length of 10.
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      min="8"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                      class="form-control"
                      name="password"
                      id="password"
                      placeholder="********"
                      required=""
                    />
                    <div class="invalid-feedback">
                      Password must contain lowercases, uppercases and digits
                      and must be at least 8 long.
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="name" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      id="name"
                      placeholder="Nguyen Van A"
                      required=""
                    />
                    <div class="invalid-feedback">Name must not be empty.</div>
                  </div>
                  <div class="col-6">
                    <label for="role" class="form-label">
                      As
                    </label>
                    <select
                      name="role"
                      id="role"
                      required=""
                      class="form-select"
                    >
                      <option value="dentist">Dentist</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
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
                        checked
                        required=""
                        value="male"
                      />
                      <label class="form-check-label" for="male">
                        Male
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="close btn btn-danger text-white fs-5 py-2 px-5 rounded-md d-flex justify-content-center align-items-end"
                >
                  Add User
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
                <div id="error" class="invalid-feedback d-block"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
