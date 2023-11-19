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
          <input type="text" class="form-control" placeholder="Amoxicillin" />
          <button class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Drug</th>
            <th scope="col">ID</th>
            {scrud === true ? <th scope="col">Action</th> : ""}
          </tr>
        </thead>
        <tbody>
          {["Amoxicillin", "Aspirin", "Cephalexin", "Azithromycin"].map(
            (drug) => (
              <tr class="align-middle">
                <td>
                  <a
                    role="button"
                    data-toggle="modal"
                    data-target="#drugInfoModalModal"
                    class="link-primary"
                  >
                    {drug}
                  </a>
                </td>
                <td>{drug.slice(0, 3).toUpperCase()}</td>
                {scrud === true ? (
                  <td>
                    <button class="btn btn-danger text-white">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            )
          )}
          {scrud === true ? (
            <tr>
              <td colspan={5}>
                <button
                  class="btn btn-primary w-100"
                  type="button"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#addDrugModal"
                >
                  <i class="bi bi-plus"></i> Drug
                </button>
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <DrugInfoModal scrud={scrud} />
      <DrugBatchInfo />
      <AddDrug />
    </div>
  );
};

export default Drugs;
