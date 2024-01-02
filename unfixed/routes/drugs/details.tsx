import * as elements from "typed-html";
import { Drug } from "../../types";
import { capitalize, formatShortDate, validateForm } from "../../utils";
import DrugBatches from "./drugBatches";

type DetailsProps = {
  scrud: string;
  drug: Drug;
};

const Details = ({ scrud, drug }: DetailsProps) => {
  const readonly = scrud === "false" ? { readonly: "" } : {};

  return (
    <div>
      <form
        hx-put="/drugs/updateDrug"
        hx-target="#status"
        hx-target-error="#error"
        class="needs-validation"
        novalidate
        hx-on={validateForm(true)}
      >
        <input
          hx-swap-oob="true"
          id="drugId"
          type="hidden"
          name="drugId"
          value={drug.id}
        />
        <input type="hidden" name="id" value={drug.id} />
        <div class="row p-2">
          <div class="mb-3">
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
              {...readonly}
              value={drug.name}
            />
            <div class="invalid-feedback">Name is required.</div>
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
                  {...readonly}
                  value={drug.price?.toString()}
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
                {...readonly}
                value={capitalize(drug.unit!)}
              />
              <div class="invalid-feedback">Unit is required.</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="directive" class="form-label">
              Directive
            </label>
            {scrud === "true" ? (
              <textarea
                class="form-control"
                name="directive"
                id="directive"
                rows="3"
                placeholder="Use for... Do not use for..."
                required=""
              >
                {drug.directive}
              </textarea>
            ) : (
              <p class="fw-bold my-2">{drug.directive}</p>
            )}
          </div>
          {scrud === "true" ? (
            <div class="d-grid gap-2">
              <button
                type="submit"
                class="close btn btn-primary text-white rounded-md d-flex justify-content-center align-items-end"
              >
                Update Drug Info
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
              <div id="error" class="invalid-feedback d-block"></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
      <div class="p-2">
        <label class="form-label">Drug Batches</label>
        {scrud === "true" ? (
          <button
            class="btn btn-primary w-100"
            type="button"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#drugBatchInfoModal"
            onclick={`
              document.querySelector('#drugBatchInfoModal [name="drugName"]').value = "${drug.name}"
            `}
          >
            <i class="bi bi-plus"></i> Drug Batch
          </button>
        ) : (
          ""
        )}
        <table class="table align-middle w-100">
          <thead>
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Exp. Date</th>
              {scrud === "true" ? <th scope="col">Action</th> : ""}
            </tr>
          </thead>
          <DrugBatches
            drugBatches={drug.drugBatches}
            drugId={drug.id}
            drugName={drug.name}
            scrud={scrud}
          />
        </table>
      </div>
    </div>
  );
};

export default Details;
