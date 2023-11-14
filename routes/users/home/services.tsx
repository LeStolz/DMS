import * as elements from "typed-html";
import ServiceItem from "./service";

const Services = () => {
  return (
    <div class="bg-white">
      <a class="scroll-link" id="services"></a>
      <section class="py-5 py-xl-8">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <div class="w-25 border-top border-5 border-primary mx-auto mb-3"></div>
              <h2 class="mb-4 display-5 text-center">Services</h2>
              <p class="text-secondary mb-5 text-center">
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Pellentesque et neque id ligula mattis
                commodo.
              </p>
              <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div class="container overflow-hidden">
          <div class="row gy-5">
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
