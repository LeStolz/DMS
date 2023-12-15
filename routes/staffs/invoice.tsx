import * as elements from "typed-html";
import { Treatment, User } from "../../types";
import {
  capitalize,
  formatPlural,
  formatPrice,
  formatShortDate,
} from "../../utils";

const Invoice = ({
  treatment,
  patient,
}: {
  treatment: Treatment;
  patient: User;
}) => {
  return (
    <div class="modal-body printable" id="invoiceModalBody">
      <div class="container-fluid">
        <h1>
          <b>MEDICAL BILLING INVOICE</b>
        </h1>
        <p class="lead text-muted m-0">
          {capitalize(treatment.shift)} · {formatShortDate(treatment.date)}
        </p>
        <div class="row">
          <div class="col">
            <p class="my-4" />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <h5 class="text-primary">PATIENT INFORMATION</h5>
            <p class="mb-1">
              <b>Name:</b> {patient.name}
            </p>
            <p class="mb-1">
              <b>Phone:</b> {patient.phone}
            </p>
            <p class="mb-1">
              <b>Address:</b> {patient.address}
            </p>
          </div>
          <div class="col-6">
            <h5 class="text-primary">PHYSICIAN INFORMATION</h5>
            <p class="mb-1">
              <b>Name:</b> {treatment.dentist[0].name}
            </p>
            <p class="mb-1">
              <b>Phone:</b> {treatment.dentist[0].phone}
            </p>
            <p class="mb-1">
              <b>Address:</b> 19/5A2 PK. 8, P. Gò Vấp, Q. 12, TP. Hồ Chí Minh
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="my-4" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="text-primary">INVOICE INFORMATION</h5>
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class="align-middle">
                  <td>1</td>
                  <td>Treatment Charge</td>
                  <td>1</td>
                  <td>Time</td>
                  <td>{formatPrice(treatment.treatmentCharge)}</td>
                  <td>{formatPrice(treatment.treatmentCharge)}</td>
                </tr>
                {treatment.services.map(({ name, price }, idx) => (
                  <tr class="align-middle">
                    <td>{idx + 2}</td>
                    <td>{name}</td>
                    <td>1</td>
                    <td>Time</td>
                    <td>{formatPrice(price)}</td>
                    <td>{formatPrice(price)}</td>
                  </tr>
                ))}
                {treatment.drugs.map(({ name, quantity, unit, price }, idx) => (
                  <tr class="align-middle">
                    <td>{idx + treatment.services.length + 2}</td>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{formatPlural(quantity, unit!, `${unit}s`)}</td>
                    <td>{formatPrice(price)}</td>
                    <td>{formatPrice(quantity * price)}</td>
                  </tr>
                ))}
                <tr class="align-middle">
                  <td></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>
                      {formatPrice(
                        treatment.treatmentCharge +
                          treatment.services.reduce(
                            (sum, service) => (sum += service.price),
                            0
                          ) +
                          treatment.drugs.reduce(
                            (sum, drug) => (sum += drug.price * drug.quantity),
                            0
                          )
                      )}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="my-3" />
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-end">
            <h2 class="text-primary">
              <b>TOTAL</b>
            </h2>
            <p class="lead text-muted m-0">
              {formatPrice(
                treatment.treatmentCharge +
                  treatment.services.reduce(
                    (sum, service) => (sum += service.price),
                    0
                  ) +
                  treatment.drugs.reduce(
                    (sum, drug) => (sum += drug.price * drug.quantity),
                    0
                  )
              )}
            </p>
          </div>
        </div>
      </div>
      <div class="row mt-3 p-2 not-printable">
        <div class="d-flex gap-3">
          <button
            type="button"
            hx-post="/staffs/addInvoice"
            hx-include="this"
            hx-target="#none"
            hx-target-error={`#${patient.id}-error`}
            class="btn btn-primary text-white flex-grow-1 fs-5 py-2 rounded-md"
            onclick="
              window.print();
              htmx.addClass(htmx.find('#invoiceModal'), 'show');
            "
          >
            <i class="bi bi-printer me-1"></i> Print
            <input type="hidden" name="treatmentId" value={treatment.id} />
          </button>
        </div>
        <span id="none"></span>
        <span
          id={`${patient.id}-error`}
          class="invalid-feedback d-inline"
        ></span>
      </div>
    </div>
  );
};

export default Invoice;
