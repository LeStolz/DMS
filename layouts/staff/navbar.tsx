import * as elements from "typed-html";

const Navbar = () => {
  return (
    <div class="d-flex flex-column p-3 bg-body-tertiary vh-100 w-100 max-w-xs position-fixed">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span class="fs-4">
          <img src="logo.png" alt="" class="icon-w-lg" />
        </span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            href="/staff"
            class="nav-link active d-flex align-items-center gap-2"
            aria-current="page"
          >
            <i class="bi-house" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a
            href="/staff/register-patient"
            class="nav-link link-body-emphasis d-flex align-items-center gap-2"
          >
            <i class="bi-speedometer2" />
            Register patient
          </a>
        </li>
        <li>
          <a
            href="/staff/payment"
            class="nav-link link-body-emphasis d-flex align-items-center gap-2"
          >
            <i class="bi-boxes" />
            Payment
          </a>
        </li>
        <li>
          <a
            href="/staff/drug"
            class="nav-link link-body-emphasis d-flex align-items-center gap-2"
          >
            <i class="bi-people" />
            Drugs
          </a>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            class="rounded-circle me-2 icon-w-sm icon-h-sm"
          />
          <strong>Dank</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li>
            <a class="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
