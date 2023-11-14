import * as elements from "typed-html";

const Invoice = () => {
  return (
    <div
      class="modal fade"
      id="invoiceModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="invoiceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header not-printable">
            <h5 class="modal-title" id="invoiceModalLabel">
              Invoice
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
          <div class="modal-body printable" id="invoiceModalBody">
            <div class="row p-2">
              <h1>
                <b>MEDICAL BILLING INVOICE</b>
              </h1>
              <p class="lead text-muted m-0">16:55, 13/11/2023</p>
              <div class="row">
                <div class="col">
                  <p class="my-4" />
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <h5 class="text-primary">PATIENT INFORMATION</h5>
                  <p class="mb-1">
                    <b>Name:</b> Võ Nam Đăng
                  </p>
                  <p class="mb-1">
                    <b>Phone:</b> 0211260560
                  </p>
                  <p class="mb-1">
                    <b>Address:</b> 19/5A2 Khu phố 8, Phường Gò Vấp, Quận 12,
                    Thành phố Hồ Chí Minh
                  </p>
                </div>
                <div class="col-6">
                  <h5 class="text-primary">PHYSICIAN INFORMATION</h5>
                  <p class="mb-1">
                    <b>Name:</b> Trương Hoàng Kha
                  </p>
                  <p class="mb-1">
                    <b>Phone:</b> 0211260200
                  </p>
                  <p class="mb-1">
                    <b>Address:</b> 19/5A2 Khu phố 8, Phường Gò Vấp, Quận 12,
                    Thành phố Hồ Chí Minh
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="my-4" />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h5 class="text-primary">INVOICE INFORMATION</h5>
                  <table class="table align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="align-middle">
                        <td>1</td>
                        <td>Treatment Charge</td>
                        <td>1</td>
                        <td>Times</td>
                        <td>300.000đ</td>
                        <td>300.000đ</td>
                      </tr>
                      {[
                        {
                          item: "Wisdom Teeth Removal",
                          quantity: "1",
                          unit: "Times",
                          price: "1.000.000đ",
                          total: "1.000.000đ",
                        },
                        {
                          item: "Dental Crowning",
                          quantity: "2",
                          unit: "Times",
                          price: "10.000.000đ",
                          total: "20.000.000đ",
                        },
                        {
                          item: "Amoxicillin",
                          quantity: "2",
                          unit: "Boxes",
                          price: "30.000đ",
                          total: "60.000đ",
                        },
                        {
                          item: "Aspirin",
                          quantity: "1",
                          unit: "Boxes",
                          price: "30.000đ",
                          total: "30.000đ",
                        },
                      ].map(({ item, quantity, unit, price, total }, idx) => (
                        <tr class="align-middle">
                          <td>{idx + 2}</td>
                          <td>{item}</td>
                          <td>{quantity}</td>
                          <td>{unit}</td>
                          <td>{price}</td>
                          <td>{total}</td>
                        </tr>
                      ))}
                      <tr class="align-middle">
                        <td></td>
                        <td>
                          <b>Total</b>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <b>21.390.000đ</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="my-3" />
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-end">
                  <h2 class="text-primary">
                    <b>TOTAL</b>
                  </h2>
                  <p class="lead text-muted m-0">21.390.000đ</p>
                </div>
              </div>
            </div>
            <div class="row p-2 not-printable">
              <div class="d-flex gap-3">
                <button
                  type="button"
                  hx-post="/staffs/addInvoice"
                  hx-target="#invoiceModalBody"
                  class="btn btn-primary text-white flex-grow-1 fs-5 py-2 rounded-md"
                  onclick="
                  window.print();
                  htmx.addClass(htmx.find('#invoiceModal'), 'show');
                "
                >
                  <i class="bi bi-printer me-1"></i> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
