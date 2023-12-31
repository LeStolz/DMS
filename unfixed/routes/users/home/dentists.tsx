import * as elements from "typed-html";
import DentistItem from "./dentist";
import { Dentist } from "../../../types";

const Dentists = ({ dentists }: { dentists: Dentist[] }) => {
  const urls: string[] = [
    "https://nhakhoakim.com/wp-content/uploads/2022/07/Ngo-Ngoc-Bao-Tram-4.jpg",
    "https://nhakhoakim.com/wp-content/uploads/2022/07/Minhbsnhakhoakim.jpg",
    "https://nhakhoakim.com/wp-content/uploads/2020/05/Bac-Le-Nguyen-Thanh-Tam-15.jpg",
    "https://nhakhoakim.com/wp-content/uploads/2022/07/khangbsnhakhoakim.jpg",
  ];

  dentists.forEach((dentist, idx) => {
    dentist.url = urls[idx % 4];
  });

  return (
    <div class="bg-white">
      <a class="scroll-link" id="dentists"></a>
      <section class="pt-5 py-xl-8">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <div class="w-25 border-top border-5 border-primary mx-auto mb-3"></div>
              <h2 class="mb-4 display-5 text-center">Dentists</h2>
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
          <div class="container row g-5 justify-content-between">
            {dentists.map((dentist) => (
              <DentistItem dentist={dentist} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dentists;
