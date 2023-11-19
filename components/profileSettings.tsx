import * as elements from "typed-html";

const ProfileSettings = ({ update = true }: { update?: boolean }) => {
  return (
    <div class="m-5 max-w-xl">
      <div>
        <h1>Profile</h1>
      </div>
      <form>
        <div class="row mb-3">
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
              value="A"
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
              value="Nguyen Van"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <label for="phone" class="form-label">
              Phone
            </label>
            <input
              type="phone"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="0901234567"
              value="0901234567"
            />
          </div>
          <div class="col-6">
            <label for="dob" class="form-label">
              Date of birth
            </label>
            <input type="date" class="form-control" name="dob" id="dob" />
          </div>
        </div>
        <div>
          <div class="d-flex">
            <div class="me-3">
              <p>Gender </p>
            </div>
            <div class="d-flex gap-4">
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
        <div class="mb-4">
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
          {update === true ? (
            <button type="submit" class="btn btn-danger text-white">
              Update
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
