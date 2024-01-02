import * as elements from "typed-html";
import { capitalize, formatDate, formatShortDate } from "../../../utils";

const ContactInfo = ({
  dentistId,
  dentistName,
  date,
  shift,
}: {
  dentistId: string;
  dentistName: string;
  date: string;
  shift: string;
}) => {
  return (
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="contactInfoModalLabel">
          Contact Info
        </h5>
        <div class="d-flex align-items-center gap-3">
          <a class="btn btn-outline-primary" href="/auth/login" role="button">
            Log in
          </a>
          <a class="btn btn-outline-primary" href="/auth/signup" role="button">
            Sign up
          </a>
          <button
            type="button"
            class="close btn btn-light icon-h-sm icon-w-sm border-0 rounded-circle"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div class="modal-body">
        <div class="row p-2">
          <div class="w-100 row p-0 m-0 mb-3">
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
              />
            </div>
            <div class="col-6">
              <label for="dob" class="form-label">
                Date of birth
              </label>
              <input type="date" class="form-control" name="dob" id="dob" />
            </div>
          </div>
          <div class="w-100 row p-0 m-0 mb-3">
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
          <div class="w-100 row p-0 m-0 mb-4">
            <div class="col-6">
              <label for="dentist-name" class="form-label">
                Dentist Name
              </label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="dentist-name"
                readonly=""
                value={dentistName}
              />
              <input
                type="hidden"
                class="form-control"
                name="dentistId"
                id="dentist-id"
                readonly=""
                value={dentistId}
              />
            </div>
            <div class="col-6">
              <label for="doa" class="form-label">
                Date of appointment
              </label>
              <p id="doa" class="m-0 py-2 fw-bold">
                {capitalize(shift)} · {formatShortDate(new Date(date))}
              </p>
              <input
                type="hidden"
                class="form-control"
                name="date"
                id="date"
                value={date}
              />
              <input
                type="hidden"
                class="form-control"
                name="shift"
                id="shift"
                value={shift}
              />
            </div>
          </div>
          <div class="d-grid gap-2">
            <button
              data-toggle="modal"
              data-dismiss="modal"
              data-target="#confirmInfoModal"
              class="close btn btn-primary text-white fs-5 py-2 px-5 rounded-md"
              onclick="
                $('#confirmInfoModal #phone').val($('#contactInfoModal #phone').val());
                $('#confirmInfoModal #dob').val($('#contactInfoModal #dob').val());
                $('#confirmInfoModal #first-name').val($('#contactInfoModal #first-name').val());
                $('#confirmInfoModal #last-name').val($('#contactInfoModal #last-name').val());
                $('#confirmInfoModal #male').prop('checked', $('#contactInfoModal #male').is(':checked'));
                $('#confirmInfoModal #female').prop('checked', $('#contactInfoModal #female').is(':checked'));
                $('#confirmInfoModal #address').val($('#contactInfoModal #address').val());
                $('#confirmInfoModal #dentist-name').val($('#contactInfoModal #dentist-name').val());
                $('#confirmInfoModal #doa').html($('#contactInfoModal #doa').html());
                $('#confirmInfoModal #date').val($('#contactInfoModal #date').val());
                $('#confirmInfoModal #shift').val($('#contactInfoModal #shift').val());
                $('#confirmInfoModal #dentist-id').val($('#contactInfoModal #dentist-id').val());
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
