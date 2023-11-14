import * as elements from "typed-html";
import AddUser from "./addUser";

const Users = () => {
  return (
    <div class="max-w-xl container pt-4">
      <h1>Users</h1>
      <form>
        <div class="input-group my-3">
          <input type="text" class="form-control" placeholder="0908531290" />
          <button class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
      <button
        class="btn btn-primary w-100 mb-2"
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
        <tbody>
          {[
            {
              name: "Alice",
              phone: "0903617711",
              role: "Patient",
            },
            {
              name: "Bob",
              phone: "0903617711",
              role: "Patient",
            },
            {
              name: "Charlie",
              phone: "0903617711",
              role: "Dentist",
            },
            {
              name: "David",
              phone: "0903617711",
              role: "Staff",
            },
            {
              name: "Eva",
              phone: "0903617711",
              role: "Staff",
            },
          ].map(({ name, phone, role }) => (
            <tr class="align-middle">
              <td>{phone}</td>
              <td>{name}</td>
              <td>{role}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault"
                  ></label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddUser />
    </div>
  );
};

export default Users;
