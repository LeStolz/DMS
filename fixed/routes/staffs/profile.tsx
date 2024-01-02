import * as elements from "typed-html";
import { Treatment, User } from "../../types";
import {
  capitalize,
  formatPlural,
  formatPrice,
  formatShortDate,
} from "../../utils";
import DrugInfoModal from "../drugs/drugInfoModal";

const Tabs = ({
  id,
  treatment,
  patient,
}: {
  id: number;
  treatment: Treatment;
  patient: User;
}) => {
  return (
    <ul
      class="nav flex-column align-items-stretch nav-pills me-3 not-printable"
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
          class="btn btn-danger text-white w-100"
          type="button"
          role="tab"
          hx-post="/staffs/invoice"
          hx-include="this"
          hx-target="#invoiceModalBody"
          data-toggle="modal"
          data-target="#invoiceModal"
        >
          <i class="bi bi-plus"></i> Invoice
          <input type="hidden" name="userId" value={patient.id} />
          <input type="hidden" name="treatmentId" value={treatment.id} />
        </button>
      </li>
    </ul>
  );
};

const TabContents = ({
  id,
  treatment,
}: {
  id: number;
  treatment: Treatment;
}) => {
  return (
    <div class="tab-content table-responsive w-100" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id={`pills-general-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-general-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-calendar"></i> Time:{" "}
          </strong>
          <span>
            {capitalize(treatment.shift)} · {formatShortDate(treatment.date)}
          </span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-bandaid"></i> Tooth treated:{" "}
          </strong>
          <span>{treatment.toothTreated}</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-journal"></i> Note:{" "}
          </strong>
          <span>{treatment.notes}</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-cash-coin"></i> Treatment Charge:{" "}
          </strong>
          <span>{formatPrice(treatment.treatmentCharge)}</span>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-dentist-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-dentist-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-person"></i> Name:{" "}
          </strong>
          <span>Dr. {treatment.dentist[0].name}</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-telephone"></i> Phone:{" "}
          </strong>
          <span>{treatment.dentist[0].phone}</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-gender-ambiguous"></i> Gender:{" "}
          </strong>
          <span>{capitalize(treatment.dentist[0].gender)}</span>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-services-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-services-tab-${id}`}
        tabindex="0"
      >
        <table class="table w-100">
          <thead>
            <tr>
              <th class="pt-0" scope="col">
                Service
              </th>
              <th class="pt-0" scope="col">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {treatment.services == null ? (
              <tr class="text-center">
                <td colspan={5}>No service found</td>
              </tr>
            ) : (
              treatment.services.map((service) => (
                <tr>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      <a class="link-primary" href="/users#services">
                        {service.name}
                      </a>
                    </p>
                  </td>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      {formatPrice(service.price)}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-prescription-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-prescription-tab-${id}`}
        tabindex="0"
      >
        <table class="table w-100">
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
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {treatment.drugs == null ? (
              <tr class="text-center">
                <td colspan={5}>No drug found</td>
              </tr>
            ) : (
              treatment.drugs.map((drug) => (
                <tr>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      <a
                        hx-post="/drugs/details"
                        hx-include="this"
                        hx-target="#drugInfoModalModal .modal-body"
                        role="button"
                        data-toggle="modal"
                        data-target="#drugInfoModalModal"
                        class="link-primary"
                      >
                        {drug.name}
                        <input type="hidden" name="id" value={drug.id} />
                        <input type="hidden" name="scrud" value="false" />
                      </a>
                    </p>
                  </td>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      {drug.quantity}{" "}
                      {formatPlural(
                        drug.quantity,
                        drug.unit || "",
                        `${drug.unit}s` || ""
                      )}
                    </p>
                  </td>
                  <td>
                    <p class="d-flex align-items-center m-0">{drug.dosage}</p>
                  </td>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      {formatShortDate(drug.expirationDate)}
                    </p>
                  </td>
                  <td>
                    <p class="d-flex align-items-center m-0">
                      {formatPrice(drug.price)}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <DrugInfoModal />
      </div>
    </div>
  );
};

const Profile = ({
  treatments,
  patient,
}: {
  treatments: Treatment[];
  patient: User;
}) => {
  return (
    <div class="d-flex flex-column px-5 not-printable">
      <div class="py-5 w-100">
        <h1>{patient ? `${patient.name}'s` : ""} Treatment History</h1>
        <div class="accordion w-100" id="treatmentsAccordion">
          {treatments == null ? (
            <p>No treatment found</p>
          ) : (
            treatments.map((treatment, idx) => (
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    data-bs-target={`#collapse-${idx}`}
                    aria-controls={`collapse-${idx}`}
                  >
                    <p class="m-0 p-0 me-3">
                      {capitalize(treatment.shift)} ·{" "}
                      {formatShortDate(treatment.date)} · Dr.{" "}
                      {treatment.dentist[0].name}
                    </p>
                  </button>
                </h2>
                <div
                  id={`collapse-${idx}`}
                  class="accordion-collapse collapse"
                  data-bs-parent="#treatmentsAccordion"
                >
                  <div class="accordion-body d-flex align-items-start">
                    <Tabs id={idx} treatment={treatment} patient={patient} />
                    <TabContents id={idx} treatment={treatment} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
