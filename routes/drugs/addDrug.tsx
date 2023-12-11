import * as elements from "typed-html";

const AddDrug = () => {
  return (
    <div
      class="modal fade"
      id="addDrugModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addDrugModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="addDrugModalLabel">
              Add Drug
            </h4>
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
                <div class="col-12">
                  <label for="name" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    placeholder="Amoxicillin"
                  />
                </div>
              </div>
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="price" class="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="price"
                    id="price"
                    placeholder="30.000đ"
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
                    placeholder="Tablets"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="directive" class="form-label">
                  Directive
                </label>
                <textarea
                  class="form-control"
                  name="directive"
                  id="directive"
                  rows="3"
                  placeholder="Use for... Do not use for..."
                ></textarea>
              </div>

              <div class="d-grid gap-2">
                <button
                  data-dismiss="modal"
                  class="close btn btn-danger text-white fs-5 py-2 px-5 rounded-md"
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

export default AddDrug;
