import * as elements from "typed-html";
import { splitFullName } from "../../../utils";

const ContactInfo = ({ user, doa, dentist }: any) => {
  return (
    <div
      class="modal fade"
      id="contactInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="contactInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactInfoModalLabel">
              Contact Info
            </h5>
            <div class="d-flex align-items-center gap-3">
              <a
                class="btn btn-outline-primary"
                href="/auth/login"
                role="button"
              >
                Log in
              </a>
              <a
                class="btn btn-outline-primary"
                href="/auth/signup"
                role="button"
              >
                Sign up
              </a>
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

export default ContactInfo;
