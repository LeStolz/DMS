import * as elements from "typed-html";
import { Drug } from "../../types";
import { capitalize, formatPrice, formatShortDate } from "../../utils";

type DetailsProps = {
  scrud: string;
  drug: Drug;
};

const Details = ({ scrud, drug }: DetailsProps) => {
  const readonly = scrud === "false" ? { readonly: "" } : {};

  return (
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
          {...readonly}
          value={drug.name}
        />
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
            {...readonly}
            value={formatPrice(drug.price!)}
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
            {...readonly}
            value={capitalize(drug.unit!)}
          />
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
          >
            {drug.directive}
          </textarea>
        ) : (
          <p class="fw-bold">{drug.directive}</p>
        )}
      </div>
      <div class="mb-3">
        <label class="form-label">Drug Batches</label>
        <table class="table align-middle w-auto">
          <thead>
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Exp. Date</th>
              {scrud === "true" ? <th scope="col">Action</th> : ""}
            </tr>
          </thead>
          <tbody>
            {drug.drugBatches == null ? (
              <tr>
                <td colspan={5}>No drug batch found</td>
              </tr>
            ) : (
              drug.drugBatches.map((drugBatch: Drug["drugBatches"][0]) => (
                <tr>
                  <td>{drugBatch.stock}</td>
                  <td>{formatShortDate(drugBatch.expirationDate)}</td>
                  {scrud === "true" ? (
                    <td>
                      <button class="btn btn-danger text-white">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            )}
            {scrud === "true" ? (
              <tr>
                <td colspan={5}>
                  <button
                    class="btn btn-primary w-100"
                    type="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#drugBatchInfoModal"
                  >
                    <i class="bi bi-plus"></i> Drug Batch
                  </button>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
      {scrud === "true" ? (
        <div class="d-grid gap-2">
          <button
            data-dismiss="modal"
            class="close btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
          >
            Update Drug
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Details;
