import * as elements from "typed-html";
import Staff from "./staff";

const Drug = () => {
  return (
    <Staff>
      <div class="col-xl-6 mx-auto container py-4">
        <div class="d-flex justify-content-between">
          <h1>Patient</h1>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Paracetamol</td>
                <td>mg</td>
                <td>Take one tablet daily</td>
                <td>Manufacturer A</td>
                <td>2023-12-31</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Staff>
  );
};

export default Drug;
