import * as elements from "typed-html";

const ConfirmInfo = () => {
  return (
    <div
      class="modal fade"
      id="confirmInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header not-printable">
            <h5 class="modal-title" id="confirmInfoModalLabel">
              Confirm Info
            </h5>
            <div class="d-flex align-items-center gap-3">
              <button
                class="btn btn-outline-primary"
                type="button"
                onclick="
                  window.print();
                  htmx.addClass(htmx.find('#confirmInfoModal'), 'show');
                "
              >
                <i class="bi bi-printer"></i>
              </button>
              <button
                type="button"
                class="close btn btn-light icon-h-sm icon-w-sm border-0 rounded-circle"
                data-dismiss="modal"
                aria-label="Close"
                onclick="window.location.reload()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body printable" id="confirmInfoModalBody">
            <div class="row p-2">
              <div class="w-100 row p-0 m-0">
                <div class="col-6">
                  <label for="phone" class="form-label">
                    Phone
                  </label>
                  <input
                    type="phone"
                    class="form-control"
                    name="phone"
                    id="phone1"
                    value="0901234567"
                    readonly=""
                  />
                </div>
                <div class="col-6">
                  <label for="dob" class="form-label">
                    Date of birth
                  </label>
                  <input
                    readonly=""
                    type="date"
                    class="form-control"
                    name="dob"
                    id="dob1"
                  />
                </div>
              </div>
              <div class="w-100 row p-0 m-0 mb-3">
                <span class="form-text">
                  You don't have to fill in the rest if you have booked an
                  appointment before.
                </span>
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
                    id="first-name-1"
                    value="A"
                    readonly=""
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
                    id="last-name-1"
                    value="Nguyen Van"
                    readonly=""
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
                        readonly=""
                        class="form-check-input-1"
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
                        readonly=""
                        class="form-check-input-1"
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
                  readonly="readonly"
                  class="form-control"
                  name="address"
                  id="address1"
                  rows="3"
                ></textarea>
              </div>
              <div class="w-100 row p-0 m-0 mb-4">
                <div class="col-6">
                  <label for="dentist-name" class="form-label">
                    Dentist Name
                  </label>
                  <input
                    readonly=""
                    type="text"
                    class="form-control"
                    name="name"
                    id="dentist-name-1"
                    value="Nguyen Van B"
                  />
                  <div class="id-dentist-1" id=""></div>
                </div>
                <div class="col-6">
                  <label for="doa" class="form-label">
                    Date of appointment
                  </label>
                  <input
                    readonly=""
                    type="date"
                    class="form-control"
                    name="doa"
                    id="doa1"
                  />
                  <div class="shift1" id=""></div>
                </div>
              </div>
              <div class="d-flex gap-3 not-printable">
                <button
                  data-toggle="modal"
                  data-dismiss="modal"
                  data-target="#contactInfoModal"
                  class="btn btn-danger text-white flex-grow-1 fs-5 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  hx-post="/users/makeAppointment"
                  hx-target="#confirmInfoModalBody"
                  hx-vars="{
                    'dentistId' : document.querySelector('.id-dentist-1').id,
                    'shift' : document.querySelector('.shift1').id,
                    'date' : document.querySelector('#doa1').value,
                    'userInfo' : {
                      'phone' : htmx.find('#phone1').value,
                      'dob' : htmx.find('#dob1').value,
                      'name' : htmx.find('#last-name-1').value + ' ' + htmx.find('#first-name-1').value,
                      'address' : htmx.find('#address1').value,
                      'gender' : htmx.find('input[name=gender]:checked').id
                    }
                  }"
                  class="btn btn-primary text-white flex-grow-1 fs-5 py-2 rounded-md"
                >
                  Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInfo;
