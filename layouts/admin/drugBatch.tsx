import * as elements from "typed-html";
import Admin from "./admin";

const DrugBatch = () => {
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
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Drug ID</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Import</th>
                <th scope="col">Removed</th>
                <th scope="col">Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>12/12/2003</td>
                <td>321</td>
                <td>
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input fs-4"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  </div>
                </td>
                <td>123</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>12/12/2003</td>
                <td>321</td>
                <td>
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input fs-4"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  </div>
                </td>
                <td>123</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>12/12/2003</td>
                <td>321</td>
                <td>
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input fs-4"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  </div>
                </td>
                <td>123</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>12/12/2003</td>
                <td>321</td>
                <td>
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input fs-4"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  </div>
                </td>
                <td>123</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>12/12/2003</td>
                <td>321</td>
                <td>
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input fs-4"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  </div>
                </td>
                <td>123</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};

export default DrugBatch;
