import * as elements from "typed-html";
import { Drug } from "../../types";
import { formatShortDate } from "../../utils";
import Warning from "../../components/warning";

const RemoveDrugBatch = () => {
  return (
    <div
      class="modal fade"
      id="removeDrugBatchInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removeDrugBatchInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="removeDrugBatchInfoModalLabel">
              Remove Drug Batch
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
              hx-post="/drugs/removeDrugBatch"
              hx-target="#drug-batches"
              hx-swap="outerHTML"
            >
              <Warning>
                This operation is destructive. Are you certain you want to
                remove drug batch
                <br />
                <span class="fw-bold" id="expirationDate"></span> of{" "}
                <span class="fw-bold" id="drugName"></span> ?
              </Warning>
              <input type="hidden" name="drugId" value="" />
              <input type="hidden" name="drugName" value="" />
              <input type="hidden" name="expirationDate" value="" />
              <div class="d-flex gap-3 mt-2">
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
                <button
                  hx-post="/drugs/removeDrugBatch"
                  hx-target="#drug-batches"
                  hx-swap="outerHTML"
                  hx-include="closest form"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#drugInfoModalModal"
                  class="flex-grow-1 btn btn-danger text-white fs-5 py-2 px-5 rounded-md d-flex justify-content-center align-items-end"
                  style="flex-basis: 0"
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveDrugBatch;
