import * as elements from "typed-html";
import Admin from "./admin";
import NewDrug from "./newDrug";
import DrugItem from "./drugItem";

const trashData = [
  {
    Name: "Aspirin",
    Unit: "mg",
    Directive: "Take two tablets daily",
    Import: "Manufacturer B",
    expiredDate: "2023-11-30",
  },
  {
    Name: "Ibuprofen",
    Unit: "mg",
    Directive: "Take with food",
    Import: "Manufacturer C",
    expiredDate: "2023-12-15",
  },
  {
    Name: "Paracetamol",
    Unit: "mg",
    Directive: "Take one tablet daily",
    Import: "Manufacturer A",
    expiredDate: "2023-12-31",
  },
];

const Drug = () => {
  return (
    <Admin>
      <div class="col-xl-6 mx-auto container py-4">
        <div class="d-flex justify-content-between">
          <h1>Drug</h1>
        </div>
        <div>
          <div class="mb-3">
            <div class="d-flex border border-primary rounded-md overflow-hidden">
              <div class="w-100">
                <input
                  type="text"
                  class="form-control border-none rounded-none"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="input-group-append bg bg-primary">
                <button class="btn text-white" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
            <small id="helpId" class="form-text text-muted">
              Search by drug
            </small>
          </div>
          <div class="mb-3">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Drug <i class="bi bi-plus-circle"></i>
            </button>
            <div
              class="modal fade bd-example-modal-lg"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Drug
                    </h5>
                  </div>
                  <div class="modal-body">
                    <NewDrug />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Unit</th>
                <th scope="col">Directive</th>
                <th scope="col">Import</th>
                <th scope="col">Exprired Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {trashData.map((item, key) => (
                <DrugItem
                  ID={key}
                  Name={item.Name}
                  Unit={item.Unit}
                  Directive={item.Directive}
                  Import={item.Import}
                  expriredDate={item.expiredDate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};

export default Drug;
