import * as elements from "typed-html";
import Staff from "./staff";

const PaymentDetail = () => {
  return (
    <Staff>
      <div class="col-xl-6 mx-auto container py-5">
        <div class="d-flex justify-content-between mb-3">
          <h1>Payment Detail</h1>
        </div>
        <form>
          <div class="mb-3">
            <div class="row">
              <div class="col-6">
                <label for="first-name" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="first-name"
                  placeholder="A"
                  disabled
                />
              </div>
              <div class="col-6">
                <label for="last-name" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="last-name"
                  placeholder="Nguyen Van"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">
              Phone
            </label>
            <input
              type="phone"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="0901234567"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="dob" class="form-label">
              Date of birth
            </label>
            <input
              type="date"
              class="form-control"
              name="dob"
              id="dob"
              disabled
            />
          </div>
          <div class="mb-3">
            <p>Gender: Nam</p>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              disabled="true"
              name="address"
              id="address"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">
              Date
            </label>
            <input type="date" class="form-control" name="date" id="date" />
          </div>
          <div class="mb-3">
            <label for="dentist" class="form-label">
              Dentist
            </label>
            <input
              type="text"
              class="form-control"
              name="dentist"
              id="dentist"
              placeholder="Ths. BS. Hoàng Công Đương"
            />
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-2">
              <p class="mb-3 fs-3">Service Bill</p>
              <div class="d-flex align-items-center">
                <button type="submit" class="btn btn-outline-warning ">
                  Print
                </button>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Service</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>chụp X quang</td>
                  <td>10000000</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Trám răng</td>
                  <td>10000000</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Cạo vôi</td>
                  <td>10000000</td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">
              <strong>Total</strong> 30000000
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-2">
              <p class="mb-3 fs-3">Medical Bill</p>
              <div class="d-flex align-items-center">
                <button type="submit" class="btn btn-outline-warning ">
                  Print
                </button>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Medicine</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>HURAZOL Esomeprazol 40mg</td>
                  <td>1 viên/ngày</td>
                  <td>2 hộp</td>
                  <td>1000000</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>HURAZOL Esomeprazol 40mg</td>
                  <td>1 viên/ngày</td>
                  <td>2 hộp</td>
                  <td>1000000</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>HURAZOL Esomeprazol 40mg</td>
                  <td>1 viên/ngày</td>
                  <td>2 hộp</td>
                  <td>1000000</td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">
              <strong>Total</strong> 30000000
            </div>
          </div>
          <div class="border-top border-secondary text-right mb-3">
            <strong class="fs-2">Total: </strong>{" "}
            <p class="fs-2 d-inline-block">300000000</p>
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-warning text-white px-5">
              Print
            </button>
            <button type="submit" class="btn btn-primary px-5">
              Payment
            </button>
          </div>
        </form>
      </div>
    </Staff>
  );
};

export default PaymentDetail;
