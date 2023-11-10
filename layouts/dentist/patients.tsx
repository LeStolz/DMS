import * as elements from "typed-html";
import Dentist from "./dentist";
import PatientItem from "./patient";

const trashData = [
  {
    name: "Alice",
    phone: "0903617711",
  },
  {
    name: "Bob",
    phone: "0903617711",
  },
  {
    name: "Charlie",
    phone: "0903617711",
  },
  {
    name: "David",
    phone: "0903617711",
  },
  {
    name: "Eva",
    phone: "0903617711",
  },
];

const Patient = () => {
  return (
    <Dentist>
      <div class="col-xl-8 ms-16 container pt-4">
        <div>
          <div>
            <h1>Patients</h1>
          </div>
          <div class="my-3">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Patient
              <i class="bi bi-plus-circle"></i>
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Patient
                    </h5>
                    <button
                      type="button"
                      class="close h-8 w-8 border-none rounded-circle"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <div class="row">
                          <div class="col-6">
                            <label for="first-name" class="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="name"
                              id="first-name"
                              placeholder="A"
                            />
                          </div>
                          <div class="col-6">
                            <label for="last-name" class="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="name"
                              id="last-name"
                              placeholder="Nguyen Van"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
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
                      <div class="mb-3">
                        <label for="dob" class="form-label">
                          Date of birth
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          name="dob"
                          id="dob"
                        />
                      </div>
                      <div class="mb-3">
                        <div class="d-flex">
                          <div class="me-3">
                            <p>Gender: </p>
                          </div>
                          <div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                              />
                              <label class="form-check-label" for="female">
                                Female
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                checked
                              />
                              <label class="form-check-label" for="male">
                                Male
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="address" class="form-label">
                          Address
                        </label>
                        <textarea
                          class="form-control"
                          name="address"
                          id="address"
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="d-grid gap-2">
                        <button
                          type="submit"
                          class="btn btn-primary text-white"
                        >
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {trashData.map((item, key) => (
                <PatientItem name={item.name} id={key} phone={item.phone} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dentist>
  );
};

export default Patient;
