import * as elements from "typed-html";

const Success = ({
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
        <i class="bi bi-check2-circle display-1 text-success"></i>
        <h1>Success!</h1>
        <p class="lead">{children}</p>
        <p class="text-muted">Thank you for choosing DMS!</p>
      </div>
    </div>
  );
};

export default Success;
