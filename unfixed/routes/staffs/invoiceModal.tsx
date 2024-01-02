import * as elements from "typed-html";

const InvoiceModal = () => {
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
          <div class="modal-body printable" id="invoiceModalBody"></div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
