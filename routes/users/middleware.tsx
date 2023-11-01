import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mssql from "mssql";
import { DbName, getDb } from "../../dbs";

export type User = {
  id: number;
  name: string;
  password: string;
  phone: string;

  gender?: string;
  isLocked?: boolean;
  dob?: Date;
  address?: string;

  role: DbName;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
      db: mssql.Request;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
    role: DbName;
  }
}

export const patient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies.token;
    const { id: id, role: role } =
      (jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload) || {};

    const user: User = {
      ...(await req.db.input("id", id).execute("getUserById")).recordset[0],
      role,
    };

    if (id == null || user == null || user.id == null) {
      throw null;
    }

    req.user = user;
    req.db = await getDb("patient");
    return next();
  } catch {
    res.status(401).send("You have to be logged in to perform this action");
  }
};

const role = async (
  role: DbName,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  patient(req, res, async () => {
    if (req.user?.role === role) {
      req.db = await getDb(role);
      return next();
    }

    return res
      .status(402)
      .send("You are not authorized to perform this action");
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
