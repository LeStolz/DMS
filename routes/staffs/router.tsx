import { Router } from "express";
import * as elements from "typed-html";
import Topbar from "../../components/topbar";
import Patients from "./patients";
import AddInvoice from "./addInvoice";
import Invoice from "./invoice";
import { staff } from "../auth/router";

const staffsRouter = Router();

staffsRouter.get("/patients", staff, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Patients />
    </Topbar>
  );
});

staffsRouter.get("/addInvoice", staff, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <AddInvoice />
      <Invoice />
    </Topbar>
  );
});

export default staffsRouter;
