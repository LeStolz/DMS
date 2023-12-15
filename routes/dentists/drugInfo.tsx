import * as elements from "typed-html";

const DrugInfo = () => {
  return (
    <div
      class="modal fade"
      id="drugInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="drugInfoModalLabel"
      aria-hidden="true"
    >
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
            <div class="row p-2">
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="drug" class="form-label">
                    Drug
                  </label>
                  <select class="form-select" name="drug" id="drug">
                    <option value="0">Amoxicillin</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="expirationDate" class="form-label">
                    Expiration Date
                  </label>
                  <select
                    class="form-select"
                    name="expirationDate"
                    id="expirationDate"
                  >
                    <option value="0">10/12/2023</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="quantity" class="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="quantity"
                    id="quantity"
                  />
                </div>
                <div class="col-6">
                  <label for="unit" class="form-label">
                    Unit
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="unit"
                    id="unit"
                    readonly=""
                    value="Tablets"
                  />
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
                ></textarea>
              </div>
              <div class="d-grid gap-2">
                <button
                  data-dismiss="modal"
                  class="close btn btn-primary text-white fs-5 py-2 px-5 rounded-md"
                >
                  Add Drug
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfo;
