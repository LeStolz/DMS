import * as elements from "typed-html";
import { Drug } from "../../types";
import { capitalize, formatShortDate, validateForm } from "../../utils";

const DrugInfo = ({ drugs }: { drugs: Drug[] }) => {
  return (
    <div
      class="modal fade"
      id="drugInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="drugInfoModalLabel"
      aria-hidden="true"
    >
      <script type="text/javascript">
        const drugs = {JSON.stringify(drugs)}; let currId = ""; let currQuantity
        = 0; let currDosage = ""; let currExp = "";
        {`
          function filterExpDate() {
            currExp = "";

            const drugBatches = (drugs.find(drug => drug.id === currId).drugBatches ?? []).filter(
              drugBatch => drugBatch.stock >= currQuantity
            );

            if (!$('#expirationDate').attr('disabled')) {
              $('#expirationDate').html(
                drugBatches.length ?
                  drugBatches.reduce(
                    (acc, drug) => acc += '<option>' + drug.expirationDate.split('T')[0] + '</option>',
                    '<option class="d-none" value="">Pick an expiration date</option>'
                  )
                :
                  '<option class="d-none" value="">No drug batch available</option>'
              );
            }
          }

          function check() {
            if (currId && currQuantity && currDosage && currExp) {
              $('#add-drug-btn').removeAttr('disabled');
            }
            else {
              $('#add-drug-btn').attr('disabled', '');
            }
          }
        `}
      </script>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="drugInfoModalLabel">
              Drug Info
            </h5>
            <div class="d-flex align-items-center gap-3">
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
            <form
              hx-post="/dentists/addDrug"
              hx-target="#addDrug"
              hx-swap="afterbegin"
              hx-target-error="#error"
              class="needs-validation"
              novalidate
              hx-on={validateForm(true)}
            >
              <div class="row p-2">
                <div class="w-100 row p-0 m-0 mb-3">
                  <div class="col-6">
                    <label for="id" class="form-label">
                      Drug
                    </label>
                    <input type="hidden" name="name" value=""></input>
                    <input type="hidden" name="unit" value=""></input>
                    <select
                      class="form-select"
                      name="id"
                      id="id"
                      required=""
                      onclick={`
                      if (typeof(this.value) != 'undefined' && this.value != '') {
                        $('#quantity').removeAttr('disabled');

                        const drug = drugs.find(drug => drug.id === this.value)

                        $('#quantity-span').html(drug.unit);
                        $('[name="name"]').attr('value', drug.name);
                        $('[name="unit"]').attr('value', drug.unit);
                        currId = this.value;
                        filterExpDate();
                        check();
                      }
                    `}
                    >
                      <option class="d-none" value="">
                        Pick a drug
                      </option>
                      {drugs.map((drug) => (
                        <option value={drug.id}>{drug.name}</option>
                      ))}
                    </select>
                    <div class="invalid-feedback">Drug is required.</div>
                  </div>
                  <div class="col-6">
                    <label for="quantity" class="form-label">
                      Quantity
                    </label>
                    <div class="input-group">
                      <input
                        type="number"
                        min="1"
                        class="form-control"
                        name="quantity"
                        id="quantity"
                        disabled
                        required=""
                        onchange={`
                        if (typeof(this.value) != 'undefined' && this.value > 0) {
                          $('#expirationDate').removeAttr('disabled');
                          currQuantity = this.value;
                          filterExpDate();
                          check();
                        }
                      `}
                      />
                      <span
                        id="quantity-span"
                        class="input-group-text rounded-end"
                      ></span>
                      <div class="invalid-feedback">Quantity is required.</div>
                    </div>
                  </div>
                </div>
                <div class="w-100 row p-0 m-0 mb-3">
                  <div class="col">
                    <label for="expirationDate" class="form-label">
                      Expiration Date
                    </label>
                    <select
                      class="form-select"
                      name="expirationDate"
                      id="expirationDate"
                      required=""
                      disabled=""
                      onclick={`
                      if (typeof(this.value) != 'undefined' && this.value != '') {
                        $('#dosage').removeAttr('disabled');
                        currExp = this.value;
                        check();
                      }
                    `}
                    ></select>
                    <div class="invalid-feedback">
                      Expiration date is required.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="dosage" class="form-label">
                    Dosage
                  </label>
                  <textarea
                    class="form-control"
                    name="dosage"
                    id="dosage"
                    rows="3"
                    disabled=""
                    required=""
                    onkeyup="
                      currDosage = this.value;
                      check();
                    "
                  ></textarea>
                </div>
                <div class="d-grid gap-2">
                  <button
                    id="add-drug-btn"
                    disabled=""
                    class="close btn btn-primary text-white fs-5 py-2 px-5 rounded-md d-flex justify-content-center align-items-end"
                  >
                    Add Drug
                    <div class="position-relative">
                      <span
                        class="htmx-indicator spinner-border spinner-border-sm position-absolute"
                        style="left: 0.4rem; bottom: 0.4rem"
                        role="status"
                      />
                      <span
                        id="status"
                        class="position-absolute"
                        role="status"
                      ></span>
                    </div>
                  </button>

                  <div id="error" class="invalid-feedback d-block"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfo;
