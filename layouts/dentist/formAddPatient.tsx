import * as elements from "typed-html";
import Dentist from "./dentist";

const FormAddPatient = () => {
  return (
    <Dentist>
      <div class="col-xl-6 mx-auto container pt-4">
        <div class="d-flex justify-content-between">
          <h1>New Patient</h1>
        </div>
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
            <input type="date" class="form-control" name="dob" id="dob" />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Add new patient
            </button>
          </div>
        </form>
      </div>
    </Dentist>
  );
};

export default FormAddPatient;
