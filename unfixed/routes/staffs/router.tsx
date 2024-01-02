import { Router } from "express";
import * as elements from "typed-html";
import Topbar from "../../components/topbar";
import Profile from "./profile";
import Invoice from "./invoice";
import { staff } from "../auth/router";
import { Treatment, User } from "../../types";
import Users from "./patients/users";
import SearchResult from "./patients/searchResult";
import { formatError, parseSqlJson } from "../../utils";
import Warning from "../../components/warning";
import InvoiceModal from "./invoiceModal";

const staffsRouter = Router();

staffsRouter.get("/patients", staff, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Users />
    </Topbar>
  );
});

staffsRouter.post("/search", staff, async (req, res) => {
  const { phone } = req.body;
  let users: User[] = [];

  try {
    users = (
      await (await req.db()).input("phone", phone).execute("getPatientsByPhone")
    ).recordset;
  } catch (error: any) {
    return res.send(
      <tbody id="user-search-result">
        <tr class="text-center">
          <td colspan={5}>No patient found</td>
        </tr>
      </tbody>
    );
  }

  return res.send(<SearchResult users={users} />);
});

staffsRouter.get("/profile/:userId", staff, async (req, res) => {
  let treatments: Treatment[] = [];
  let patient: User;

  try {
    const patientDetails = await parseSqlJson(
      (
        await (await req.db())
          .input("id", req.params.userId)
          .execute("getPatientDetails")
      ).recordset[0]
    );

    treatments = patientDetails.treatments;
    patient = patientDetails.patient;
    patient.id = req.params.userId;
  } catch {
    return res.send(
      <Topbar user={req.user}>
        <Warning fullscreen>Patient not found.</Warning>
      </Topbar>
    );
  }

  return res.send(
    <Topbar user={req.user}>
      <div>
        <Profile treatments={treatments} patient={patient} />
        <InvoiceModal />
      </div>
    </Topbar>
  );
});

staffsRouter.post("/invoice", staff, async (req, res) => {
  const { userId, treatmentId } = req.body;

  let treatment: Treatment | undefined;
  let patient: User | undefined;

  try {
    const patientDetails = await parseSqlJson(
      (
        await (await req.db()).input("id", userId).execute("getPatientDetails")
      ).recordset[0]
    );

    treatment = (patientDetails.treatments as Treatment[]).find(
      (treatment) => treatment.id === treatmentId
    );
    patient = patientDetails.patient;
  } catch {}

  if (treatment != null && patient != null) {
    return res.send(<Invoice treatment={treatment} patient={patient} />);
  }

  return res.send(<Warning>Invoice not found.</Warning>);
});

staffsRouter.post("/addInvoice", staff, async (req, res) => {
  const { treatmentId } = req.body;

  try {
    await (await req.db())
      .input("treatmentId", treatmentId)
      .execute("createInvoice");
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res
      .status(500)
      .send("Adding invoice failed. Please try again later.");
  }

  return res.send(<span id="none"></span>);
});

export default staffsRouter;
