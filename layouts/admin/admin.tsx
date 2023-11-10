import * as elements from "typed-html";
import BaseHtml from "../baseHtml";
import Navbar from "./navbar";

const Admin = ({ children }: elements.Children) => {
  return (
    <BaseHtml>
      <Navbar />
      {children}
    </BaseHtml>
  );
};

export default Admin;
