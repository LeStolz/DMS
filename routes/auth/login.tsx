import * as elements from "typed-html";
import BaseHtml from "../../components/baseHtml";

const Login = () => {
  return (
    <BaseHtml>
      <div class="d-flex align-items-center min-vh-100">
        <div class="col-xl-8 mx-auto container shadow-lg">
          <div class="row">
            <div class="d-none d-lg-block col-0 col-lg-6 p-0">
              <div class="banner"></div>
            </div>
            <div class="col p-4">
              <div class="d-flex justify-content-between">
                <h1>Login</h1>
                <div class="d-flex align-items-center">
                  <a
                    class="btn btn-outline-primary"
                    href="/auth/signup"
                    role="button"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
              <form
                hx-post="/auth/login"
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
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Phone must contain only digits and have a length of 10.
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
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Password must contain lowercases, uppercases and digits and
                    must be at least 8 long.
                  </div>
                </div>
                <div class="mb-4">
                  <label for="role" class="form-label">
                    As
                  </label>
                  <select name="role" id="role" required="" class="form-select">
                    <option value="patient">Patient</option>
                    <option value="dentist">Dentist</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-danger text-white">
                    Login
                    <div
                      class="htmx-indicator spinner-border spinner-border-sm"
                      role="status"
                    />
                  </button>
                  <div id="error" class="invalid-feedback d-block"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BaseHtml>
  );
};

export default Login;
