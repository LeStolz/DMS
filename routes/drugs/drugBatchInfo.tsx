import * as elements from "typed-html";
import { validateForm } from "../../utils";

const DrugBatchInfo = () => {
  return (
    <div
      class="modal fade"
      id="drugBatchInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="drugBatchInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="drugBatchInfoModalLabel">
              Drug Batch Info
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
              hx-post="/drugs/addDrugBatch"
              hx-target="#drug-batches"
              hx-swap="afterbegin"
              hx-target-error="#drug-batches-error"
              class="needs-validation"
              novalidate
              hx-on={validateForm(true, "drug-batches-error")}
            >
              <div class="row p-2">
                <div class="w-100 row p-0 m-0 mb-3">
                  <div class="col-6">
                    <label for="stock" class="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      min="1"
                      required=""
                      class="form-control"
                      name="stock"
                      id="stock"
                    />
                    <div class="invalid-feedback">
                      Stock must be at least 1.
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="expirationDate" class="form-label">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      name="expirationDate"
                      id="expirationDate"
                      required=""
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input type="hidden" name="drugName" value="" />
                    <div class="invalid-feedback">
                      Expiration Date must be after today.
                    </div>
                  </div>
                  <input id="drugId" type="hidden" name="drugId" value="" />
                </div>
                <div class="d-flex gap-3">
                  <button
                    type="submit"
                    class="flex-grow-1 close btn btn-primary text-white fs-5 py-2 px-5 rounded-md d-flex justify-content-center align-items-end"
                    style="flex-basis: 0"
                  >
                    Add Drug Batch
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
                  <button
                    type="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#drugInfoModalModal"
                    class="flex-grow-1 close btn btn-primary text-white fs-5 py-2 px-5 rounded-md"
                    style="flex-basis: 0"
                  >
                    Back
                  </button>
                </div>
                <div
                  id="drug-batches-error"
                  class="invalid-feedback d-block"
                ></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugBatchInfo;
