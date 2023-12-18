import * as elements from "typed-html";
import { User } from "../types";
import { validateForm } from "../utils";

type ProfileSettingsProps = {
  update?: boolean;
  user?: User;
  isDentist?: boolean;
};

const ProfileSettings = ({
  update = true,
  user,
  isDentist = false,
}: ProfileSettingsProps) => {
  const firstName = user?.name.split(" ").at(-1);
  const lastName = user?.name.split(" ").slice(0, -1).join(" ");

  return (
    <div class="m-5 max-w-xl">
      <div>
        <h1>Profile</h1>
      </div>
      <form
        hx-put={
          isDentist
            ? `/dentists/updatePatient/${user?.id}`
            : "/users/updatePatient"
        }
        hx-target-error="#error"
        hx-target="#status"
        class="needs-validation"
        novalidate
        hx-on={validateForm()}
      >
        <div class="mb-3">
          <div class="row">
            <div class="col-6">
              <label for="firstName" class="form-label">
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                name="firstName"
                id="firstName"
                placeholder={firstName}
                value={firstName}
                required=""
              />
              <div class="invalid-feedback">First name is required.</div>
            </div>
            <div class="col-6">
              <label for="lastName" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                name="lastName"
                id="lastName"
                placeholder={lastName}
                value={lastName}
                required=""
              />
              <div class="invalid-feedback">Last name is required.</div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone
          </label>
          <input
            type="phone"
            pattern="[0-9]{10}"
            class="form-control"
            name="phone"
            id="phone"
            placeholder={user?.phone}
            value={user?.phone}
            required=""
          />
          <div class="invalid-feedback">
            Phone must contain only digits and have a length of 10.
          </div>
          {update === true ? (
            <span class="form-text">
              You will be logged out if you change your phone number.
            </span>
          ) : (
            ""
          )}
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
            required=""
            value={user?.dob?.toISOString().split("T")[0]}
            max={new Date().toISOString().split("T")[0]}
          />
          <div class="invalid-feedback">
            Date of birth must be before today.
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
                  required=""
                  value="female"
                  checked={user?.gender === "female"}
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
                  checked={user?.gender === "male"}
                  required=""
                  value="male"
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
            required=""
            class="form-control"
            name="address"
            id="address"
            rows="3"
          >
            {user?.address}
          </textarea>
          <div class="invalid-feedback">Address is required.</div>
        </div>
        {update === true ? (
          <div class="d-grid gap-2">
            <button
              type="submit"
              class="btn btn-primary text-white d-flex justify-content-center align-items-end"
            >
              Update
              <div class="position-relative">
                <span
                  class="htmx-indicator spinner-border spinner-border-sm position-absolute"
                  style="left: 0.3rem; bottom: 0.3rem"
                  role="status"
                />
                <span
                  id="status"
                  class="position-absolute"
                  style="left: 0.3rem; bottom: 0"
                  role="status"
                ></span>
              </div>
            </button>
            <div id="error" class="invalid-feedback d-block"></div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;
