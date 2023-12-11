import * as elements from "typed-html";
import AddUser from "./addUser";

const Users = () => {
  return (
    <div class="max-w-xl container pt-4">
      <h1>Users</h1>
      <form>
        <div class="input-group my-3">
          <input
            autocomplete="off"
            name="phone"
            type="search"
            hx-post="/admins/search"
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
      <button
        class="btn btn-primary w-100 mb-1"
        type="button"
        data-dismiss="modal"
        data-toggle="modal"
        data-target="#addUserModal"
      >
        <i class="bi bi-plus"></i> User
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Locked</th>
          </tr>
        </thead>
        <tbody id="user-search-result"></tbody>
      </table>
      <AddUser />
    </div>
  );
};

export default Users;
