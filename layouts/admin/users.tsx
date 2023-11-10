import * as elements from "typed-html";
import Admin from "./admin";
import UserItem from "./userItem";
import NewUser from "./newUser";

const Users = () => {
  return (
    <Admin>
      <div class="col-xl-6 mx-auto container py-4">
        <div class="d-flex justify-content-between">
          <h1>Users</h1>
        </div>
        <div>
          <div class="mb-3">
            <div class="d-flex border border-primary rounded-md overflow-hidden">
              <div class="w-100">
                <input
                  type="text"
                  class="form-control border-none rounded-none"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="input-group-append bg bg-primary">
                <button class="btn text-white" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
            <small id="helpId" class="form-text text-muted">
              Search by drug
            </small>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Users <i class="bi bi-plus-circle"></i>
            </button>
            <div
              class="modal fade bd-example-modal-lg"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Users
                    </h5>
                  </div>
                  <div class="modal-body">
                    <NewUser />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
                <th scope="col" class="text-center">
                  Blocked
                </th>
              </tr>
            </thead>
            <tbody>
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
              <UserItem />
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};

export default Users;
