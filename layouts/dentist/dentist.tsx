import * as elements from "typed-html";
import BaseHtml from "../baseHtml";
import Navbar from "./navbar";

const Dentist = ({ children }: elements.Children) => {
  return (
    <BaseHtml>
      <div class="d-flex">
        <Navbar />
        {children}
      </div>
    </BaseHtml>
  );
};

export default Dentist;
