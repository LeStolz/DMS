import * as elements from "typed-html";

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
            <div class="row p-2">
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="stock" class="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="stock"
                    id="stock"
                  />
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
                  />
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#drugInfoModalModal"
                  class="close btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
                >
                  <i class="bi bi-plus"></i> Drug Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugBatchInfo;
