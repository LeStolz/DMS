import { Router } from "express";
import * as elements from "typed-html";
import jwt from "jsonwebtoken";
import { User, patient } from "./middleware";

const cookieOptions = {
  secure: true,
  httpOnly: true,
  signed: true,
};

const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
  const input = req.body;

  try {
    const user: User = {
      ...(
        await req.db
          .input("name", input.name)
          .input("password", input.password)
          .input("phone", input.phone)
          .input("gender", input.gender)
          .input("dob", input.dob)
          .input("address", input.address)
          .execute("createPatient")
      ).recordset[0],
      role: "patient",
    };

    res.cookie(
      "token",
      jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!),
      cookieOptions
    );

    return res.json({ ...user, password: undefined });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }

    return res.status(500).send("Signup failed. Please try again later");
  }
});

usersRouter.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const user: User = {
    ...(
      await req.db
        .input("phone", phone)
        .input("password", password)
        .execute("getPatientByCred")
    ).recordset[0],
    role: "patient",
  };

  if (phone == null || password == null || user == null || user.id == null) {
    return res.status(401).send("Phone and password do not match");
  }

  res.cookie(
    "token",
    jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!),
    cookieOptions
  );

  return res.json({ ...user, password: undefined });
});

usersRouter.get("/logout", patient, async (req, res) => {
  return res.clearCookie("token");
});

export default usersRouter;
