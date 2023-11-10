import * as elements from "typed-html";
import Staff from "./staff";

const RegisterPatient = () => {
  return (
    <Staff>
      <div class="col-xl-6 mx-auto container py-4">
        <div class="d-flex justify-content-between">
          <h1>Register Patient</h1>
        </div>
        <form>
          <div class="mb-3">
            <div class="row">
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
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              name="password"
              id="password"
              placeholder="********"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">
              Phone
            </label>
            <input
              type="phone"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="0901234567"
            />
          </div>
          <div class="mb-3">
            <label for="dob" class="form-label">
              Date of birth
            </label>
            <input type="date" class="form-control" name="dob" id="dob" />
          </div>
          <div class="mb-3">
            <p>Gender</p>
            <div>
              <div class="form-check d-inline-block">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                />
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
              <div class="form-check d-inline-block mx-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  checked
                />
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              name="address"
              id="address"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group mb-3">
            <label for="exampleFormControlSelect1" class="form-label">
              Example select
            </label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Ths. BS. Hoàng Công Đương</option>
              <option>Ths. BS. Hoàng Công Đương</option>
              <option>Ths. BS. Hoàng Công Đương</option>
              <option>Ths. BS. Hoàng Công Đương</option>
              <option>Ths. BS. Hoàng Công Đương</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlSelect1" class="form-label">
              Example select
            </label>
            <input type="date" class="form-control" name="dob" id="dob" />
          </div>
          <div class="form-group mb-3">
            <label for="exampleFormControlSelect1" class="form-label">
              Example select
            </label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Sáng</option>
              <option>Trưa</option>
              <option>Chiều</option>
            </select>
          </div>

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
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">...</div>
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

          <div class="text-right">
            <button
              type="button"
              class="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Print
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </Staff>
  );
};

export default RegisterPatient;
