import * as elements from "typed-html";

const DrugInfoModal = () => {
  return (
    <div
      class="modal fade"
      id="drugInfoModalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="drugInfoModalModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="drugInfoModalModalLabel">
              Drug Info
            </h4>
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
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfoModal;
