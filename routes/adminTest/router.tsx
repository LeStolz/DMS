import { Router } from "express";
import * as elements from "typed-html";
import Admin from "../../layouts/admin/admin";
import Drug from "../../layouts/admin/drug";
import NewDrug from "../../layouts/admin/newDrug";
import DrugDetail from "../../layouts/admin/drugDetail";
import Users from "../../layouts/admin/users";
import Profile from "../../layouts/admin/profile";
import NewUser from "../../layouts/admin/newUser";
import DrugBatch from "../../layouts/admin/drugBatch";

const adminRouter = Router();

adminRouter.get("/", async (req, res) => {
  return res.send(<Admin />);
});

adminRouter.get("/drugs", async (req, res) => {
  return res.send(<Drug />);
});

adminRouter.get("/new-drug", async (req, res) => {
  return res.send(<NewDrug />);
});

adminRouter.get("/drug-detail", async (req, res) => {
  return res.send(<DrugDetail />);
});

adminRouter.get("/clients", async (req, res) => {
  return res.send(<Users />);
});

adminRouter.get("/profile-client", async (req, res) => {
  return res.send(<Profile />);
});

adminRouter.get("/drug-batch", async (req, res) => {
  return res.send(<DrugBatch />);
});

adminRouter.get("/new-user", async (req, res) => {
  return res.send(<NewUser />);
});

export default adminRouter;
