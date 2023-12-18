import * as elements from "typed-html";

const Users = () => {
  return (
    <div class="max-w-xl container pt-4">
      <h1>Patients</h1>
      <form>
        <div class="input-group my-3">
          <input
            autocomplete="off"
            name="phone"
            type="search"
            hx-post="/dentists/search"
            hx-trigger="input changed delay:100ms, search, load"
            hx-target="#user-search-result"
            hx-swap="outerHTML"
            class="form-control"
            placeholder="0908531290"
          />
          <button type="button" class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
      <a
        class="btn btn-primary w-100 mb-1"
        role="button"
        type="button"
        href="/dentists/addTreatment"
      >
        <i class="bi bi-plus"></i> Treatment
      </a>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody id="user-search-result"></tbody>
      </table>
    </div>
  );
};

export default Users;
