import * as elements from "typed-html";
import Admin from "./admin";

const DrugDetail = () => {
  return (
    <Admin>
      <div class="col-xl-6 mx-auto container py-4">
        <div class="d-flex justify-content-between">
          <h1>Drug</h1>
          <div class="d-flex align-items-center">
            <button type="submit" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
        <div>
          <form>
            <div class="mb-3">
              <label for="" class="form-label">
                Name
              </label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Directive
              </label>
              <textarea class="form-control" name="" id="" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Price
              </label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Unit
              </label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Expiration Date
              </label>
              <input type="date" name="" id="" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Import
              </label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">
                Stock
              </label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="text-right">
              <button class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
};

export default DrugDetail;
