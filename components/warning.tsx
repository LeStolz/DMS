import * as elements from "typed-html";

const Warning = ({
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
        <i class="bi bi-exclamation-circle display-1 text-danger"></i>
        <h1>Warning!</h1>
        <p class="lead">{children}</p>
      </div>
    </div>
  );
};

export default Warning;
