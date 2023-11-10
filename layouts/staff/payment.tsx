import * as elements from "typed-html";
import Staff from "./staff";

const Payment = () => {
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
              Search by phone number
            </small>
          </div>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Nguyen Van A</td>
                <td>0902377788</td>
                <td>
                  <a href="/staff/payment-detail" class="btn btn-success">
                    View
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Nguyen Van A</td>
                <td>0902377788</td>
                <td>
                  <a href="/staff/payment-detail" class="btn btn-success">
                    View
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Nguyen Van A</td>
                <td>0902377788</td>
                <td>
                  <a href="/staff/payment-detail" class="btn btn-success">
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Staff>
  );
};

export default Payment;
