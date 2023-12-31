import { NextFunction, Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mssql from "mssql";
import { DbName, getDb } from "../../dbs";
import * as elements from "typed-html";
import Signup from "./signup";
import Login from "./login";
import Warning from "../../components/warning";
import Topbar from "../../components/topbar";
import { User } from "../../types";
import { formatError } from "../../utils";

const cookieOptions = {
  secure: true,
  httpOnly: true,
  signed: true,
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
      db: () => Promise<mssql.Request>;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    phone: string;
    password: string;
    role: DbName;
  }
}

export const getRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.db = async () => await getDb("guest");

  try {
    const token = req.signedCookies.token;
    const {
      phone: phone,
      password: password,
      role: role,
    } = (jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload) || {};

    const user: User = {
      ...(
        await (await req.db())
          .input("phone", phone)
          .input("password", password)
          .input("role", role)
          .execute("getUserByCredFixed")
      ).recordset?.[0],
      role,
    };

    if (
      phone == null ||
      password == null ||
      user == null ||
      user.id == null ||
      user.isLocked
    ) {
      throw null;
    }

    req.user = user;
    req.db = async () => await getDb(role);
    return next();
  } catch {
    return next();
  }
};

const role = async (
  role: DbName,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getRole(req, res, async () => {
    if (req.user?.role === role) {
      return next();
    }

    return res.status(402).send(
      <Topbar user={req.user}>
        <Warning fullscreen>
          You are not authorized to perform this action.
        </Warning>
      </Topbar>
    );
  });
};

export const patient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getRole(req, res, async () => {
    if (req.user?.role !== "guest") {
      return next();
    }

    return res.status(401).send(
      <Topbar user={req.user}>
        <Warning fullscreen>
          You have to be logged in to perform this action.
        </Warning>
      </Topbar>
    );
  });
};

export const admin = async (req: Request, res: Response, next: NextFunction) =>
  role("admin", req, res, next);

export const staff = async (req: Request, res: Response, next: NextFunction) =>
  role("staff", req, res, next);

export const dentist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => role("dentist", req, res, next);

const authRouter = Router();

authRouter.get("/signup", async (req, res) => {
  return res.send(<Signup />);
});

authRouter.get("/login", async (req, res) => {
  return res.send(<Login />);
});

authRouter.post("/signup", async (req, res) => {
  try {
    const input = req.body;
    const user: User = {
      ...(
        await (await req.db())
          .input("name", `${input.lastName} ${input.firstName}`)
          .input("password", input.password)
          .input("phone", input.phone)
          .input("gender", input.gender)
          .input("dob", input.dob)
          .input("address", input.address)
          .execute("createPatientFixed")
      ).recordset[0],
      role: "patient",
    };

    res.cookie(
      "token",
      jwt.sign(
        { phone: user.phone, password: user.password, role: user.role },
        process.env.JWT_SECRET!
      ),
      cookieOptions
    );

    return res
      .header("HX-Redirect", "/users")
      .json({ ...user, password: undefined });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Signup failed. Please try again later.");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { phone, password, role } = req.body;

    const user: User = {
      ...(
        await (await req.db())
          .input("phone", phone)
          .input("password", password)
          .input("role", role)
          .execute("getUserByCredFixed")
      ).recordset?.[0],
      role,
    };

    if (
      phone == null ||
      password == null ||
      user == null ||
      user.id == null ||
      user.isLocked
    ) {
      return res.status(401).send("Phone and password do not match.");
    }

    res.cookie(
      "token",
      jwt.sign(
        { phone: user.phone, password: user.password, role: user.role },
        process.env.JWT_SECRET!
      ),
      cookieOptions
    );

    return res
      .header("HX-Redirect", "/users")
      .json({ ...user, password: undefined });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send(formatError(error.message));
    }

    return res.status(500).send("Login failed. Please try again later.");
  }
});

authRouter.get("/logout", patient, async (req, res) => {
  return res.clearCookie("token").header("HX-Redirect", "/users").end();
});

export default authRouter;
