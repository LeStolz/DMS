import * as elements from "typed-html";
import BaseHtml from "../../components/baseHtml";

const Signup = () => {
  return (
    <BaseHtml>
      <div class="d-flex align-items-center min-vh-100">
        <div class="col-xl-8 mx-auto container shadow-lg">
          <div class="row">
            <div class="col p-4">
              <div class="d-flex justify-content-between">
                <h1>Sign Up</h1>
                <div class="d-flex align-items-center">
                  <a
                    class="btn btn-outline-primary"
                    href="/auth/login"
                    role="button"
                  >
                    Log in
                  </a>
                </div>
              </div>
              <form
                hx-post="/auth/signup"
                hx-target-error="#error"
                class="needs-validation"
                novalidate
                hx-on="htmx:before-request:
                  if (!this.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                  this.classList.add('was-validated');
                "
              >
                <div class="mb-3">
                  <div class="row">
                    <div class="col-6">
                      <label for="firstName" class="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="firstName"
                        id="firstName"
                        placeholder="A"
                        required=""
                      />
                      <div class="invalid-feedback">
                        First name must not be empty.
                      </div>
                    </div>
                    <div class="col-6">
                      <label for="lastName" class="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="lastName"
                        id="lastName"
                        placeholder="Nguyen Van"
                        required=""
                      />
                      <div class="invalid-feedback">
                        Last name must not be empty.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
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
                    Password must contain lowercases, uppercases and digits and
                    must be at least 8 long.
                  </div>
                </div>
                <div class="mb-3">
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
                  <span class="form-text">
                    You will use your phone number to login in the future.
                  </span>
                </div>
                <div class="mb-3">
                  <label for="dob" class="form-label">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    name="dob"
                    id="dob"
                    required=""
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <div class="invalid-feedback">
                    Date of birth must be before today.
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
                <div class="mb-4">
                  <label for="address" class="form-label">
                    Address
                  </label>
                  <textarea
                    placeholder="235 Nguyen Van Cu, Phuong 4, Quan 5"
                    required=""
                    class="form-control"
                    name="address"
                    id="address"
                    rows="3"
                  ></textarea>
                  <div class="invalid-feedback">Address must not be empty.</div>
                </div>
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-danger text-white">
                    Sign up
                    <div
                      class="htmx-indicator spinner-border spinner-border-sm"
                      role="status"
                    />
                  </button>
                  <div id="error" class="invalid-feedback d-block"></div>
                </div>
              </form>
            </div>
            <div class="d-none d-lg-block col-0 col-lg-6 p-0">
              <div class="banner"></div>
            </div>
          </div>
        </div>
      </div>
    </BaseHtml>
  );
};

export default Signup;
