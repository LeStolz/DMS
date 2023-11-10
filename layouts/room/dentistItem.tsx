import * as elements from "typed-html";
import Calendar from "../../components/calendar";

const DentistItem = () => {
  return (
    <div class="row col-xl-6 mb-3">
      <div class="col-5 h-100">
        <div>
          <img
            src="https://careplusvn.com/Uploads/t/ba/bac-si-duong_0000918_270.jpeg"
            class="img-fluid rounded-top w-100"
            alt=""
          />
        </div>
        <div>
          <div>
            <button
              type="button"
              class="btn btn-primary w-100 rounded-none text-uppercase"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i class="bi bi-calendar"></i>
              make an appointment
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close h-8 w-8 border-none rounded-circle"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <Calendar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="ml-sm-3 d-flex justify-content-between flex-column">
          <div>
            <p class="text-uppercase">ABOUT Ths. BS. Hoàng Công Đương</p>
            <h3>Medical specialty concerned with the care of</h3>
            <p class="text-justify">
              On her way she met a copy. The copy warned the Little Blind Text,
              that where it came from it would have been rewritten a thousand
              times and everything that was left from its origin would be the
              word.
            </p>
            <div class="row">
              <div class="d-flex col-6">
                <div class="me-3">
                  <div class="d-flex justify-content-center align-items-center rounded-md h-8 w-8 bg-primary text-white">
                    <i class="bi bi-gender-ambiguous"></i>
                  </div>
                </div>
                <div>
                  <strong>Phone Number</strong>
                  <p>0036823893</p>
                </div>
              </div>
              <div class="d-flex col-6">
                <div class="me-3">
                  <div class="d-flex justify-content-center align-items-center rounded-md h-8 w-8 bg-primary text-white">
                    <i class="bi bi-telephone-fill"></i>
                  </div>
                </div>
                <div>
                  <strong>Gender</strong>
                  <p>Nam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistItem;
