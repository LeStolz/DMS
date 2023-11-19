import * as elements from "typed-html";
import ProfileSettings from "../../components/profileSettings";
import DrugInfo from "./drugInfo";
import DrugInfoModal from "../drugs/drugInfoModal";

const Tabs = ({ id }: { id: number }) => {
  return (
    <ul
      class="nav flex-column align-items-stretch nav-pills me-3"
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
          hx-post="/dentists/addTreatment"
          hx-target="#addTreatment"
          role="tab"
        >
          Save
        </button>
      </li>
    </ul>
  );
};

const TabContents = ({ id }: { id: number }) => {
  return (
    <div
      class="tab-content table-responsive w-100 vh-100 max-h-xl"
      id="pills-tabContent"
    >
      <div
        class="ms-2 tab-pane fade show active"
        id={`pills-general-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-general-tab-${id}`}
        tabindex="0"
      >
        <div class="mb-3">
          <label for="date" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-calendar"></i> Time:{" "}
            </strong>
          </label>
          <input type="date" class="form-control" name="date" id="date" />
        </div>
        <div class="mb-3">
          <label for="tooth" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-bandaid"></i> Tooth treated:{" "}
            </strong>
          </label>
          <input type="input" class="form-control" name="tooth" id="tooth" />
        </div>
        <div class="mb-3">
          <label for="note" class="form-label">
            <strong class="text-secondary">
              <i class="bi bi-journal"></i> Note:{" "}
            </strong>
          </label>
          <textarea
            class="form-control"
            name="note"
            id="note"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div
        class="ms-2 tab-pane fade"
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
        class="ms-2 tab-pane fade"
        id={`pills-services-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-services-tab-${id}`}
        tabindex="0"
      >
        <table class="table w-auto align-middle">
          <thead>
            <tr>
              <th class="pt-0" scope="col">
                Service
              </th>
              <th class="pt-0" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {["Wisdom Teeth Removal", "Dental Crowning"].map((service) => (
              <tr>
                <td>
                  <a class="link-primary" href="/users#services">
                    {service}
                  </a>
                </td>
                <td>
                  <button class="btn btn-danger text-white">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colspan={2}>
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle text-white w-100"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-plus"></i> Service{" "}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Wisdom Teeth Removal
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Dental Crowning
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="ms-2 tab-pane fade"
        id={`pills-prescription-${id}`}
        role="tabpanel"
        aria-labelledby={`pills-prescription-tab-${id}`}
        tabindex="0"
      >
        <table class="table align-middle w-auto">
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
                Action
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
                  <button class="btn btn-danger text-white">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colspan={5}>
                <button
                  class="btn btn-primary w-100"
                  type="button"
                  data-toggle="modal"
                  data-target="#drugInfoModal"
                >
                  <i class="bi bi-plus"></i> Drug
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <DrugInfo />
        <DrugInfoModal />
      </div>
    </div>
  );
};

const AddTreatment = () => {
  return (
    <div id="addTreatment">
      <ProfileSettings update={false} />
      <div class="mx-5 max-w-xxl pb-5">
        <h1>Treatment</h1>
        <div class="d-flex align-items-start">
          <Tabs id={1} />
          <TabContents id={1} />
        </div>
      </div>
    </div>
  );
};

export default AddTreatment;
