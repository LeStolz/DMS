import * as elements from "typed-html";
import { validateForm } from "../../utils";

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
            <form
              hx-post="/drugs/addDrug"
              hx-target="#drug-search-result"
              hx-swap="afterbegin"
              hx-target-error="#error"
              class="needs-validation"
              novalidate
              hx-on={validateForm(true)}
            >
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
                      required=""
                    />
                    <div class="invalid-feedback">Name is required.</div>
                  </div>
                </div>
                <div class="w-100 row p-0 m-0 mb-3">
                  <div class="col-6">
                    <label for="price" class="form-label">
                      Price
                    </label>
                    <div class="input-group">
                      <input
                        type="number"
                        min="1000"
                        step="1000"
                        class="form-control"
                        name="price"
                        id="price"
                        placeholder="30000"
                        required=""
                      />
                      <span class="input-group-text rounded-end">đ</span>
                      <div class="invalid-feedback">
                        Price must be multiples of 1000.
                      </div>
                    </div>
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
                      required=""
                    />
                    <div class="invalid-feedback">Unit is required.</div>
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
                    required=""
                  ></textarea>
                </div>

                <div class="d-grid gap-2">
                  <button
                    type="submit"
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

export default AddDrug;
