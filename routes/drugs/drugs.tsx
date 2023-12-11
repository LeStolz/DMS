import * as elements from "typed-html";
import DrugInfoModal from "./drugInfoModal";
import DrugBatchInfo from "./drugBatchInfo";
import AddDrug from "./addDrug";

const Drugs = ({ scrud = false }: { scrud?: boolean }) => {
  return (
    <div class="max-w-xl container pt-4">
      <h1>Drugs</h1>
      <form>
        <div class="input-group my-3">
          <input
            autocomplete="off"
            name="name"
            type="search"
            hx-post="/drugs/search"
            hx-trigger="input changed delay:100ms, search, load"
            hx-target="#drug-search-result"
            hx-swap="outerHTML"
            class="form-control"
            placeholder="Amoxicillin"
          />
          <button type="button" class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <input name="scrud" type="hidden" value={scrud ? "true" : "false"} />
      </form>
      {scrud === true ? (
        <button
          class="btn btn-primary w-100 mb-1"
          type="button"
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#addDrugModal"
        >
          <i class="bi bi-plus"></i> Drug
        </button>
      ) : (
        ""
      )}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Drug</th>
            <th scope="col">ID</th>
            {scrud === true ? <th scope="col">Action</th> : ""}
          </tr>
        </thead>
        <tbody id="drug-search-result"></tbody>
      </table>
      <DrugInfoModal />
      <DrugBatchInfo />
      <AddDrug />
    </div>
  );
};

export default Drugs;
