import * as elements from "typed-html";

const listBtn = [
  {
    name: "Home",
    icon: <i class="bi bi-house"></i>,
    link: "/dentist",
  },
  {
    name: "Schedule ",
    icon: <i class="bi bi-calendar-event"></i>,
    link: "/dentist/schedule",
  },
  {
    name: "Patient",
    icon: <i class="bi bi-people"></i>,
    link: "/dentist/patients",
  },
];

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
        {listBtn.map((item) => (
          <li class="background-steel-blue mb-2 rounded-md">
            <a
              href={item.link}
              class="nav-link link-body-emphasis d-flex align-items-center text-white gap-2"
            >
              {item.icon}
              {item.name}
            </a>
          </li>
        ))}
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
