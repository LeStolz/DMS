import * as elements from "typed-html";
import BaseHtml from "../baseHtml";
import MedicalItem from "./medicalItem";

const Profile = () => {
  return (
    <BaseHtml>
      <div class="container rounded bg-white">
        <div class="row">
          <div class="col-md-5 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">Edogaru</span>
              <span class="text-black-50">edogaru@mail.com.my</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-7 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2 mb-3">
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    value=""
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Surname</label>
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    placeholder="surname"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 mb-3">
                  <label class="form-label">Mobile Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone number"
                    value=""
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="address" class="form-label">
                    Address
                  </label>
                  <textarea
                    class="form-control"
                    name=""
                    id="address"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-md-12">
                  <label class="form-label">Date of birth</label>
                  <input type="date" class="form-control" />
                </div>
              </div>
              <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button" type="button">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h4 class="text-right mb-3">Medical record</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="w-1">
                  #
                </th>
                <th scope="col" class="w-2">
                  Date
                </th>
                <th scope="col" class="w-24">
                  Shift
                </th>
                <th scope="col" class="w-56">
                  Dentist
                </th>
                <th scope="col">Symptom</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
              <MedicalItem />
            </tbody>
          </table>
        </div>
      </div>
    </BaseHtml>
  );
};

export default Profile;
