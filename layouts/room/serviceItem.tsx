import * as elements from "typed-html";

const ServiceItem = () => {
  return (
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="px-xl-2">
        <div class="row">
          <div class="col-4 d-flex justify-content-center">
            <div class="background-dark-charcoal border border-2 border-warning h-20 w-20 d-flex justify-content-center align-items-center rounded-circle text-white fs-3">
              <i class="bi bi-amazon"></i>
            </div>
          </div>
          <div class="col-8">
            <h5>Web Development</h5>
            <h6>1000000000 đ</h6>
            <p class="m-0 text-secondary">
              Vestibulum bibendum, lorem a blandit lacinia, nisi velit posuere
              nisl, vel placerat magna mauris mollis maximus est.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
