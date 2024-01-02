import { Router } from "express";
import * as elements from "typed-html";
import Topbar from "../../components/topbar";
import { admin, patient } from "../auth/router";
import Drugs from "./drugs";
import { Drug, DrugBatch } from "../../types";
import Warning from "../../components/warning";
import { formatError, parseSqlJson } from "../../utils";
import SearchResult from "./searchResult";
import Details from "./details";
import DrugRow from "./drugRow";
import DrugBatchRow from "./drugBatchRow";
import DrugBatches from "./drugBatches";

const drugsRouter = Router();

drugsRouter.post("/search", patient, async (req, res) => {
  const { name, scrud } = req.body;
  let drugs: Drug[] = [];

  try {
    drugs = (
      await (await req.db()).input("name", name).execute("getDrugsFixed")
    ).recordset;
  } catch {
    return res.send(
      <tbody id="drug-search-result">
        <tr class="text-center">
          <td colspan={5}>No drug found</td>
        </tr>
      </tbody>
    );
  }

  return res.send(<SearchResult scrud={scrud} drugs={drugs} />);
});

drugsRouter.post("/details", patient, async (req, res) => {
  const { id, scrud } = req.body;

  try {
    const drug = await parseSqlJson(
      (
        await (await req.db()).input("id", id).execute("getDrugDetailsFixed")
      ).recordset[0]
    );

    return res.send(<Details scrud={scrud} drug={drug} />);
  } catch (error: any) {
    if (error.message.includes("Drug")) {
      return res.send(<Warning>{error.message}</Warning>);
    }

    return res.status(500).send("Internal Server Error");
  }
});

drugsRouter.get("/drugs", patient, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Drugs />
    </Topbar>
  );
});

drugsRouter.get("/drugs-scrud", admin, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Drugs scrud />
    </Topbar>
  );
});

drugsRouter.post("/addDrug", admin, async (req, res) => {
  try {
    const { name, directive, price, unit } = req.body;

    const drug: Drug = (
      await (await req.db())
        .input("name", name)
        .input("directive", directive)
        .input("price", price)
        .input("unit", unit)
        .execute("createDrugFixed")
    ).recordset[0];

    return res.send(
      <DrugRow drug={drug} scrud="true">
        <span
          id="status"
          class="position-absolute"
          style="left: 0.3rem; bottom: -0.1rem"
          role="status"
          hx-swap-oob="true"
        >
          <i class="bi bi-check-lg"></i>
        </span>
      </DrugRow>
    );
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Create failed. Please try again later.");
  }
});

drugsRouter.post("/removeDrug", admin, async (req, res) => {
  try {
    const { id } = req.body;

    const drugs: Drug[] = (
      await (await req.db()).input("id", id).execute("deleteDrugFixed")
    ).recordset;

    return res.send(<SearchResult scrud="true" drugs={drugs} />);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Delete failed. Please try again later.");
  }
});

drugsRouter.put("/updateDrug", admin, async (req, res) => {
  try {
    const { id, name, directive, price, unit } = req.body;

    const drug: Drug = (
      await (await req.db())
        .input("id", id)
        .input("name", name)
        .input("directive", directive)
        .input("price", price)
        .input("unit", unit)
        .execute("updateDrugFixed")
    ).recordset[0];

    return res.send(<i class="bi bi-check-lg"></i>);
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }
});

drugsRouter.post("/addDrugBatch", admin, async (req, res) => {
  try {
    const { drugId, expirationDate, stock, drugName } = req.body;

    const drugBatch: Drug["drugBatches"][0] = (
      await (await req.db())
        .input("drugId", drugId)
        .input("exp", expirationDate)
        .input("import", stock)
        .execute("addDrugBatchFixed")
    ).recordset[0];

    return res.send(
      <DrugBatchRow
        drugBatch={drugBatch}
        drugId={drugId}
        drugName={drugName}
        scrud="true"
      >
        <span
          id="status"
          class="position-absolute"
          style="left: 0.3rem; bottom: -0.1rem"
          role="status"
          hx-swap-oob="true"
        >
          <i class="bi bi-check-lg"></i>
        </span>
        <tr id="no-drug-batch-found" class="d-none" hx-swap-oob="true"></tr>
      </DrugBatchRow>
    );
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }
});

drugsRouter.post("/removeDrugBatch", admin, async (req, res) => {
  try {
    const { drugId, expirationDate, drugName } = req.body;

    const drugBatches: Drug["drugBatches"] = (
      await (await req.db())
        .input("drugId", drugId)
        .input("exp", expirationDate)
        .execute("removeDrugBatchFixed")
    ).recordset.filter((drugBatch) => !drugBatch.isRemoved);

    return res.send(
      <DrugBatches
        drugBatches={drugBatches.length ? drugBatches : null}
        drugId={drugId}
        drugName={drugName}
        scrud={"true"}
      />
    );
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Remove failed. Please try again later.");
  }
});

export default drugsRouter;
