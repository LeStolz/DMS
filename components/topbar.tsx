import * as elements from "typed-html";
import BaseHtml from "./baseHtml";
import { User } from "../routes/auth/router";

const Topbar = ({ children, user }: elements.Children & { user?: User }) => {
  const tabsByRoles = {
    guest: [],
    patient: [],
    dentist: [
      ["Patients", "/dentists/patients"],
      ["Schedule", "/dentists/schedule"],
      ["Drugs", "/drugs/drugs"],
    ],
    staff: [
      ["Patients", "/staffs/patients"],
      ["Drugs", "/drugs/drugs"],
    ],
    admin: [
      ["Users", "/admins/users"],
      ["Drugs", "/drugs/drugs-scrud"],
    ],
  };

  return (
    <BaseHtml>
      <nav class="sticky-top navbar navbar-expand-md bg-body-tertiary not-printable">
        <div class="container-fluid px-5">
          <a class="navbar-brand text-primary fw-bold" href="/users">
            DMS
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="d-flex w-100">
              <ul class="d-flex navbar-nav">
                {user == null
                  ? ""
                  : tabsByRoles[user.role].map((tab) => (
                      <li class="nav-item mb-2 mb-md-0">
                        <a class="nav-link me-3" href={tab[1]}>
                          {tab[0]}
                        </a>
                      </li>
                    ))}
              </ul>
              {user == null ? (
                <ul class="d-flex ms-auto navbar-nav">
                  <li class="nav-item mb-2 mb-md-0">
                    <a
                      role="button"
                      class="btn btn-outline-primary me-3"
                      href="/auth/login"
                    >
                      Login
                    </a>
                  </li>
                  <li class="nav-item mb-2 mb-md-0">
                    <a
                      role="button"
                      class="btn btn-outline-primary"
                      href="/auth/signup"
                    >
                      Signup
                    </a>
                  </li>{" "}
                </ul>
              ) : (
                <ul class="d-flex ms-auto navbar-nav">
                  <li class="nav-item mb-2 mb-md-0">
                    <a
                      role="button"
                      class="btn btn-primary me-3"
                      href="/users/profile"
                    >
                      Profile
                    </a>
                  </li>
                  <li class="nav-item mb-2 mb-md-0">
                    <a
                      role="button"
                      class="btn btn-primary me-3"
                      href="/auth/login"
                      hx-get="/auth/logout"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      {children}
    </BaseHtml>
  );
};

export default Topbar;
