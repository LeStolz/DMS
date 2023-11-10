import * as elements from "typed-html";
import Admin from "./admin";

const NewDrug = () => {
  return (
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
      </form>
    </div>
  );
};

export default NewDrug;
