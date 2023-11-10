import * as elements from "typed-html";

const Banner = () => {
  return (
    <div class="container-fluid p-5 bg-white">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1db9e870723935.5bacc126e41ed.jpg"
            class="d-block mx-lg-auto img-fluid rounded-xl"
            alt="Bootstrap Themes"
            width="700"
            height="500"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">Welcome to DMS</h1>
          <p class="lead">
            Our mission is to provide our patients with the highest quality
            dental care in a comfortable and welcoming environment.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">
              Primary
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
