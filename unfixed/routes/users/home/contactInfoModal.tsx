import * as elements from "typed-html";

const ContactInfoModal = () => {
  return (
    <div
      class="modal fade"
      id="contactInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="contactInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document"></div>
    </div>
  );
};

export default ContactInfoModal;
