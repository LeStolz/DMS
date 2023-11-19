import * as elements from "typed-html";

const DentistItem = () => {
  return (
    <div class="row col-12 col-lg-6 mb-5">
      <div class="col-5 h-100">
        <img
          src="https://careplusvn.com/Uploads/t/ba/bac-si-duong_0000918_270.jpeg"
          class="img-fluid rounded-top w-100"
        />
        <a
          class="btn btn-primary w-100 rounded-top-0 rounded-bottom"
          href="#dates"
          onclick={`document.getElementById('dentistSelect').value = ${2}`}
        >
          <i class="bi bi-calendar"></i>
          Book Appointment
        </a>
      </div>
      <div class="col">
        <div class="ml-sm-3 d-flex justify-content-between flex-column">
          <h5 class="mb-3">
            <strong>Ths. BS. Hoàng Công Đương</strong>
          </h5>
          <div class="mb-3 d-flex align-items-center">
            <div class="me-3">
              <div class="d-flex justify-content-center align-items-center rounded-md icon-h-sm icon-w-sm bg-primary text-white">
                <i class="bi bi-telephone"></i>
              </div>
            </div>
            <div>
              <strong>Phone</strong>
              <p class="m-0">0036823893</p>
            </div>
          </div>
          <div class="mb-3 d-flex align-items-center">
            <div class="me-3">
              <div class="d-flex justify-content-center align-items-center rounded-md icon-h-sm icon-w-sm bg-primary text-white">
                <i class="bi bi-gender-ambiguous"></i>
              </div>
            </div>
            <div>
              <strong>Gender</strong>
              <p class="m-0">Nam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistItem;
