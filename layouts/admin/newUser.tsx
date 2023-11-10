import Admin from "./admin";
import * as elements from "typed-html";

const NewUser = () => {
  return (
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
        <input type="date" class="form-control" name="dob" id="dob" />
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
    </form>
  );
};

export default NewUser;
