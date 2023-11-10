import * as elements from "typed-html";

const Category = ({ title, color }: elements.Attributes) => {
  return (
    <div class={`text-center py-5 ${color}`}>
      <div class="mb-3">
        <h1 class="text-white">{title}</h1>
      </div>
      <div>
        <a
          class="btn background-tomato text-white fw-bold fs-5 py-2 px-5 rounded-md"
          href="#"
        >
          See more
        </a>
      </div>
    </div>
  );
};

export default Category;
