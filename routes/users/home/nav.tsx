import * as elements from "typed-html";

const Nav = () => {
  return (
    <div class="row m-0">
      <div class="col-6 p-0">
        <div class={`text-center py-5 bg-secondary`}>
          <div class="mb-3">
            <h1 class="text-white">Services</h1>
          </div>
          <div>
            <a
              class="btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
              href="#services"
            >
              See more
            </a>
          </div>
        </div>
      </div>
      <div class="col-6 p-0">
        <div class={`text-center py-5 bg-primary`}>
          <div class="mb-3">
            <h1 class="text-white">Dentists</h1>
          </div>
          <div>
            <a
              class="btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
              href="#dentists"
            >
              See more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
