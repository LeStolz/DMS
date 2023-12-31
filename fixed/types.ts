import { DbName } from "./dbs";

export type User = {
  id: string;
  name: string;
  password: string;
  phone: string;

  gender?: string;
  isLocked?: boolean;
  dob?: Date;
  address?: string;

  role: DbName;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  url?: string;
};

export type Dentist = {
  id: string;
  name: string;
  phone: string;
  gender: string;
  url?: string;
};

export type Appointment = {
  dentistId: string;
  patientId: string;
  shift: "morning" | "afternoon" | "evening";
  date: Date;
};

export type Schedule = {
  dentistId: string;
  shift: "morning" | "afternoon" | "evening";
  date: number;
};

export type Drug = {
  id: string;
  name: string;
  directive?: string;
  price?: number;
  unit?: string;
  drugBatches: {
    stock: number;
    expirationDate: Date;
    isRemoved?: boolean;
  }[];
};

export type DrugBatch = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  dosage: string;
  expirationDate: Date;
  stock?: number;
  unit?: string;
};

export type Treatment = {
  id: string;
  shift: string;
  date: Date;
  toothTreated: string;
  notes: string;
  treatmentCharge: number;
  dentist: [Omit<Dentist, "id" | "url">];
  services: Omit<Service, "id" | "description" | "url">[];
  drugs: DrugBatch[];
};
