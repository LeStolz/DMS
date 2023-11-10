import * as elements from "typed-html";
import BaseHtml from "../baseHtml";
import NavbarClient from "./navbarClient";

const Client = ({ children }: elements.Children) => {
  return (
    <BaseHtml>
      <div class="client">
        <NavbarClient />
        {children}
      </div>
    </BaseHtml>
  );
};

export default Client;
