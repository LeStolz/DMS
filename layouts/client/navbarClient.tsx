import * as elements from "typed-html";
import BaseHtml from "../baseHtml";

const NavbarClient = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4 border-bottom border-secondary">
      <a class="navbar-brand" href="#">
        LOGO
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="/users/guest">
            Home
          </a>
          <a class="nav-item nav-link" href="/users/guest/service">
            Service
          </a>
          <a class="nav-item nav-link" href="/users/guest/dentist">
            Dentist
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
