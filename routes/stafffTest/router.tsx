import { Router } from "express";
import * as elements from "typed-html";
import RegisterPatient from "../../layouts/staff/registerPatient";
import Payment from "../../layouts/staff/payment";
import PaymentDetail from "../../layouts/staff/paymentDetail";
import Drug from "../../layouts/staff/drug";
import Home from "../../layouts/staff/home";

const staffRouter = Router();

staffRouter.get("/", async (req, res) => {
  return res.send(<Home />);
});

staffRouter.get("/register-patient", async (req, res) => {
  return res.send(<RegisterPatient />);
});

staffRouter.get("/drug", async (req, res) => {
  return res.send(<Drug />);
});

staffRouter.get("/payment", async (req, res) => {
  return res.send(<Payment />);
});

staffRouter.get("/payment-detail", async (req, res) => {
  return res.send(<PaymentDetail />);
});
export default staffRouter;
