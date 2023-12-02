import { Router } from "express";
import * as elements from "typed-html";
import Topbar from "../../components/topbar";
import { admin, patient } from "../auth/router";
import Drugs from "./drugs";
import { Drug } from "../../types";
import Warning from "../../components/warning";
import { parseSqlJson } from "../../utils";
import SearchResult from "./searchResult";
import Details from "./details";

const drugsRouter = Router();

drugsRouter.post("/search", patient, async (req, res) => {
  const { name, scrud } = req.body;
  let drugs: Drug[] = [];

  try {
    drugs = (await (await req.db()).input("name", name).execute("getDrugs"))
      .recordset;
  } catch {}

  return res.send(<SearchResult scrud={scrud} drugs={drugs} />);
});

drugsRouter.post("/details", patient, async (req, res) => {
  const { id, scrud } = req.body;

  try {
    const drug = await parseSqlJson(
      (
        await (await req.db()).input("id", id).execute("getDrugDetails")
      ).recordset[0]
    );

    return res.send(<Details scrud={scrud} drug={drug} />);
  } catch {
    return res.send(<Warning>Drug does not exist</Warning>);
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

export default drugsRouter;
