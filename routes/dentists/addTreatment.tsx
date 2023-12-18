import * as elements from "typed-html";
import DrugInfo from "./drugInfo";
import { Drug, Service, Treatment, User } from "../../types";
import {
  capitalize,
  formatPlural,
  formatPrice,
  formatShortDate,
  validateForm,
} from "../../utils";

const Tabs = ({ id }: { id: number }) => {
  return (
    <ul
      class="nav flex-column align-items-stretch nav-pills me-3"
      id={`pills-tab-${id}`}
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100 active"
          id={`pills-general-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-general-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-general-${id}`}
          aria-selected="true"
        >
          General
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-dentist-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-dentist-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-dentist-${id}`}
          aria-selected="false"
        >
          Dentist
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-services-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-services-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-services-${id}`}
          aria-selected="false"
        >
          Services
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-prescription-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-prescription-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-prescription-${id}`}
          aria-selected="false"
        >
          Prescription
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-danger text-white w-100 d-flex justify-content-center align-items-end"
          type="submit"
          role="tab"
          id="save"
        >
          Save
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
        <div id="add-treatment-error" class="invalid-feedback d-block"></div>
      </li>
    </ul>
  );
};

const TabContents = ({
  id,
  dentist,
  services,
  drugs,
}: {
  id: number;
  dentist: User;
  services: Service[];
  drugs: Drug[];
}) => {
  return (
    <div class="tab-content w-100 vh-100 max-h-xl" id="pills-tabContent">
      <div
        class="ms-2 tab-pane fade show active"
        id={`pills-general-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-general-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <label for="shift" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-calendar"></i> Time:{" "}
            </strong>
          </label>
          <div class="row">
            <div class="col-6">
              <select name="shift" id="shift" required="" class="form-select">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <div class="invalid-feedback">Shift is required.</div>
            </div>
            <div class="col-6">
              <input
                type="date"
                class="form-control"
                name="date"
                id="date"
                required=""
                value={new Date().toISOString().split("T")[0]}
              />
              <div id="appointment-error" class="invalid-feedback">
                Date is required.
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="toothTreated" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-bandaid"></i> Tooth treated:{" "}
            </strong>
          </label>
          <input
            type="text"
            class="form-control"
            name="toothTreated"
            id="toothTreated"
            required=""
          />
          <div class="invalid-feedback">Tooth treated is required.</div>
        </div>
        <div class="mb-3">
          <label for="notes" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-journal"></i> Note:{" "}
            </strong>
          </label>
          <textarea
            required=""
            class="form-control"
            name="notes"
            id="notes"
            rows="3"
          ></textarea>{" "}
          <input type="hidden" name="symptoms" value="" />
          <input type="hidden" name="outcome" value="" />
          <div class="invalid-feedback">Note is required.</div>
        </div>
        <div class="mb-3">
          <label for="treatmentCharge" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-cash-coin"></i> Treatment Charge:{" "}
            </strong>
          </label>
          <div class="input-group">
            <input
              type="number"
              min="1000"
              step="1000"
              class="form-control"
              name="treatmentCharge"
              id="treatmentCharge"
              required=""
            />
            <span class="input-group-text rounded-end">đ</span>
            <div class="invalid-feedback">
              Treatment charge must be multiples of 1000.
            </div>
          </div>
        </div>
      </div>
      <div
        class="ms-2 tab-pane fade"
        id={`pills-dentist-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-dentist-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-person"></i> Name:{" "}
          </strong>
          <span>Dr. {dentist.name}</span>
          <input type="hidden" name="dentistId" value={dentist.id} />
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-telephone"></i> Phone:{" "}
          </strong>
          <span>{dentist.phone}</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-gender-ambiguous"></i> Gender:{" "}
          </strong>
          <span>{capitalize(dentist.gender!)}</span>
        </div>
      </div>
      <div
        class="ms-2 tab-pane fade"
        id={`pills-services-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-services-tab-${id}`}
        tabindex="0"
      >
        {services.map((service, idx) => (
          <div>
            <input
              type="checkbox"
              class="service-checkbox btn-check"
              autocomplete="off"
              name="serviceId"
              value={service.id}
              id={`service-${service.id}`}
              required=""
              onchange="
                let requiredCheckboxes = $('.service-checkbox');

                if(requiredCheckboxes.is(':checked')) {
                  requiredCheckboxes.removeAttr('required');
                } else {
                  requiredCheckboxes.attr('required', 'required');
                }
              "
            />
            <label
              class="btn mb-3 border"
              style="border-color: transparent !important"
              for={`service-${service.id}`}
            >
              {service.name}
            </label>
            {idx === services.length - 1 ? (
              <span class="invalid-feedback">Service is required.</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div
        class="ms-2 tab-pane fade"
        id={`pills-prescription-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-prescription-tab-${id}`}
        tabindex="0"
      >
        <div class="table-responsive">
          <table class="table align-middle w-100">
            <thead>
              <tr>
                <th class="pt-0" scope="col">
                  Drug
                </th>
                <th class="pt-0" scope="col">
                  Quantity
                </th>
                <th class="pt-0" scope="col">
                  Dosage
                </th>
                <th class="pt-0" scope="col">
                  Exp. Date
                </th>
                <th class="pt-0" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody id="addDrug"></tbody>
          </table>
        </div>
        <button
          class="btn btn-primary w-100"
          type="button"
          data-toggle="modal"
          data-target="#drugInfoModal"
        >
          <i class="bi bi-plus"></i> Drug
        </button>
        <div id="drug-error" class="invalid-feedback d-block"></div>
      </div>
    </div>
  );
};

const AddTreatment = ({
  dentist,
  services,
  drugs,
}: {
  dentist: User;
  services: Service[];
  drugs: Drug[];
}) => {
  return (
    <div id="addTreatment">
      <div class="m-5 max-w-xxl">
        <h1>New Treatment</h1>
        <form
          class="needs-validation d-flex align-items-start"
          hx-post="/dentists/addTreatment"
          hx-target="#addTreatment"
          hx-target-error="#add-treatment-error"
          novalidate
          hx-on={validateForm(false, "add-treatment-error")}
        >
          <Tabs id={-1} />
          <TabContents
            id={-1}
            dentist={dentist}
            services={services}
            drugs={drugs}
          />
        </form>
        <DrugInfo drugs={drugs} />
      </div>
    </div>
  );
};

export default AddTreatment;
