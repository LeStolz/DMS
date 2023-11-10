import * as elements from "typed-html";
import DentistItem from "./dentistItem";
import Client from "../client/client";

const Dentists = () => {
  return (
    <Client>
      <div class="bg-white">
        <section class="py-5 py-xl-8">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                <h2 class="mb-4 display-5 text-center">Dentist</h2>
                <p class="text-secondary mb-5 text-center">
                  Orci varius natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Pellentesque et neque id ligula mattis
                  commodo.
                </p>
                <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
              </div>
            </div>
          </div>

          <div class="container mt-5">
            <div class="row g-5">
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
              <DentistItem />
            </div>
          </div>
        </section>
      </div>
    </Client>
  );
};

export default Dentists;
