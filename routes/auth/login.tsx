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
              <form>
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
                <div class="mb-4">
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
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-danger text-white">
                    Login
                  </button>
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
