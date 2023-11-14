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
                  <span class="form-text">
                    You will use your phone number to login in the future.
                  </span>
                </div>
                <div class="mb-3">
                  <label for="dob" class="form-label">
                    Date of birth
                  </label>
                  <input type="date" class="form-control" name="dob" id="dob" />
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
                    class="form-control"
                    name="address"
                    id="address"
                    rows="3"
                  ></textarea>
                </div>
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-danger text-white">
                    Sign up
                  </button>
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
