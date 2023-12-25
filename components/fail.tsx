import * as elements from "typed-html";

const Fail = ({
  children,
  fullscreen = false,
}: elements.Children & { fullscreen?: boolean }) => {
  return (
    <div
      class={`d-flex justify-content-center align-items-center ${
        fullscreen && "mt-5 pt-0 pt-sm-5"
      }`}
    >
      <div class="text-center">
        <i class="bi bi-x-octagon text-danger display-1"></i>
        <h1>Fail!</h1>
        <p class="lead">{children}</p>
        <p class="text-muted">Thank you for choosing DMS!</p>
      </div>
    </div>
  );
};

export default Fail;
