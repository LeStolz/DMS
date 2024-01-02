import { Router } from "express";
import * as elements from "typed-html";
import Users from "./users";
import Topbar from "../../components/topbar";
import { admin } from "../auth/router";
import SearchResult from "./searchResult";
import { User } from "../../types";
import { formatError } from "../../utils";
import UserRow from "./userRow";

const adminsRouter = Router();

adminsRouter.post("/search", admin, async (req, res) => {
  const { phone } = req.body;
  let users: User[] = [];

  try {
    users = (await (await req.db()).input("phone", phone).execute("getUsers"))
      .recordset;
  } catch {}

  return res.send(<SearchResult users={users} />);
});

adminsRouter.post("/toggleLock", admin, async (req, res) => {
  const { phone, role, lock } = req.body;

  try {
    await (
      await req.db()
    )
      .input("phone", phone)
      .input("role", role)
      .execute(`${lock === "on" ? "lockUser" : "unlockUser"}`);
  } catch {}

  return res.send();
});

adminsRouter.post("/addUser", admin, async (req, res) => {
  try {
    const { phone, password, name, role, gender } = req.body;

    const user: User = {
      ...(
        await (
          await req.db()
        )
          .input("name", name)
          .input("password", password)
          .input("phone", phone)
          .input("gender", gender)
          .execute(`${role === "dentist" ? "createDentist" : "createStaff"}`)
      ).recordset[0],
      role,
    };

    return res.send(
      <UserRow user={user}>
        <span
          id="status"
          class="position-absolute"
          style="left: 0.3rem; bottom: -0.1rem"
          role="status"
          hx-swap-oob="true"
        >
          <i class="bi bi-check-lg"></i>
        </span>
      </UserRow>
    );
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Update failed. Please try again later.");
  }
});

adminsRouter.get("/users", admin, async (req, res) => {
  return res.send(
    <Topbar user={req.user}>
      <Users />
    </Topbar>
  );
});

export default adminsRouter;
