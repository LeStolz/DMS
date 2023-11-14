import * as elements from "typed-html";
import DrugInfoModal from "../drugs/drugInfoModal";

const Tabs = ({ id }: { id: number }) => {
  return (
    <ul
      class="nav flex-column align-items-stretch nav-pills me-3 not-printable"
      id={`pills-tab-${id}`}
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100 active"
          id={`pills-general-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-general-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-general-${id}`}
          aria-selected="true"
        >
          General
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-dentist-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-dentist-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-dentist-${id}`}
          aria-selected="false"
        >
          Dentist
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-services-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-services-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-services-${id}`}
          aria-selected="false"
        >
          Services
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-primary mb-3 w-100"
          id={`pills-prescription-tab-${id}`}
          data-bs-toggle="pill"
          data-bs-target={`#pills-prescription-${id}`}
          type="button"
          role="tab"
          aria-controls={`pills-prescription-${id}`}
          aria-selected="false"
        >
          Prescription
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-danger text-white w-100"
          type="button"
          role="tab"
          data-toggle="modal"
          data-target="#invoiceModal"
        >
          <i class="bi bi-plus"></i> Invoice
        </button>
      </li>
    </ul>
  );
};

const TabContents = ({ id }: { id: number }) => {
  return (
    <div class="tab-content table-responsive" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id={`pills-general-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-general-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-calendar"></i> Time:{" "}
          </strong>
          <span>Morning · 10/10/2023</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-bandaid"></i> Tooth treated:{" "}
          </strong>
          <span>Wisdom tooth</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-journal"></i> Note:{" "}
          </strong>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, voluptates adipisci exercitationem, dolore odio
            eligendi animi ipsum possimus dolor reprehenderit repellendus
            architecto aspernatur error consectetur commodi numquam id dolorem.
            Eaque?
          </span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-cash-coin"></i> Treatment Charge:{" "}
          </strong>
          <span>1.000.000đ</span>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-dentist-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-dentist-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-person"></i> Name:{" "}
          </strong>
          <span>Ths. BS. Hoàng Công Đương</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-telephone"></i> Phone:{" "}
          </strong>
          <span>0905842490</span>
        </div>
        <div class="mb-3">
          <strong class="text-secondary">
            <i class="bi bi-gender-ambiguous"></i> Gender:{" "}
          </strong>
          <span>Male</span>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-services-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-services-tab-${id}`}
        tabindex="0"
      >
        <table class="table">
          <thead>
            <tr>
              <th class="pt-0" scope="col">
                Service
              </th>
              <th class="pt-0" scope="col">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {["Wisdom Teeth Removal", "Dental Crowning"].map((service) => (
              <tr>
                <td>
                  <p class="d-flex align-items-center m-0">
                    <a class="link-primary" href="/users#services">
                      {service}
                    </a>
                  </p>
                </td>
                <td>
                  <p class="d-flex align-items-center m-0">13.000.000đ</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        class="tab-pane fade"
        id={`pills-prescription-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-prescription-tab-${id}`}
        tabindex="0"
      >
        <table class="table">
          <thead>
            <tr>
              <th class="pt-0" scope="col">
                Drug
              </th>
              <th class="pt-0" scope="col">
                Quantity
              </th>
              <th class="pt-0" scope="col">
                Dosage
              </th>
              <th class="pt-0" scope="col">
                Exp. Date
              </th>
              <th class="pt-0" scope="col">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {["Amoxicillin", "Aspirin"].map((drug) => (
              <tr>
                <td>
                  <p class="d-flex align-items-center m-0">
                    <a
                      role="button"
                      data-toggle="modal"
                      data-target="#drugInfoModalModal"
                      class="link-primary"
                    >
                      {drug}
                    </a>
                  </p>
                </td>
                <td>
                  <p class="d-flex align-items-center m-0">2 tablets</p>
                </td>
                <td>
                  <p class="d-flex align-items-center m-0">
                    2 pills/morning. 2 pills/afternoon.
                  </p>
                </td>
                <td>
                  <p class="d-flex align-items-center m-0">30/12/2023</p>
                </td>
                <td>
                  <p class="d-flex align-items-center m-0">30.000đ</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DrugInfoModal />
      </div>
    </div>
  );
};

const AddInvoice = () => {
  return (
    <div class="d-flex flex-column px-5 not-printable">
      <div class="py-5 w-100">
        <h1>Treatment History</h1>
        <div class="accordion w-100" id="treatmentsAccordion">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  data-bs-target={`#collapse-${idx}`}
                  aria-controls={`collapse-${idx}`}
                >
                  <p class="m-0 p-0 me-3">
                    Morning · 10/10/2023 · Ths. BS. Hoàng Công Đương
                  </p>
                </button>
              </h2>
              <div
                id={`collapse-${idx}`}
                class="accordion-collapse collapse"
                data-bs-parent="#treatmentsAccordion"
              >
                <div class="accordion-body d-flex align-items-start">
                  <Tabs id={idx} />
                  <TabContents id={idx} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
