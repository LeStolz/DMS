import mssql from "mssql";

const mssqlOptions = {
  encrypt: false,
  trustServerCertificate: true,
};

const dbs = {
  guest: new mssql.ConnectionPool(
    {
      user: process.env.DB_GUEST_USER,
      password: process.env.DB_GUEST_PASSWORD,
      server: process.env.DB_SERVER_URL!,
      port: parseInt(process.env.DB_SERVER_PORT!),
      database: process.env.DB_NAME,
      options: mssqlOptions,
    },
    () => console.log("Connected as Guest")
  ).connect(),
  patient: new mssql.ConnectionPool(
    {
      user: process.env.DB_PATIENT_USER,
      password: process.env.DB_PATIENT_PASSWORD,
      server: process.env.DB_SERVER_URL!,
      port: parseInt(process.env.DB_SERVER_PORT!),
      database: process.env.DB_NAME,
      options: mssqlOptions,
    },
    () => console.log("Connected as Patient")
  ).connect(),
  dentist: new mssql.ConnectionPool(
    {
      user: process.env.DB_DENTIST_USER,
      password: process.env.DB_DENTIST_PASSWORD,
      server: process.env.DB_SERVER_URL!,
      port: parseInt(process.env.DB_SERVER_PORT!),
      database: process.env.DB_NAME,
      options: mssqlOptions,
    },
    () => console.log("Connected as Dentist")
  ).connect(),
  staff: new mssql.ConnectionPool(
    {
      user: process.env.DB_STAFF_USER,
      password: process.env.DB_STAFF_PASSWORD,
      server: process.env.DB_SERVER_URL!,
      port: parseInt(process.env.DB_SERVER_PORT!),
      database: process.env.DB_NAME,
      options: mssqlOptions,
    },
    () => console.log("Connected as Staff")
  ).connect(),
  admin: new mssql.ConnectionPool(
    {
      user: process.env.DB_ADMIN_USER,
      password: process.env.DB_ADMIN_PASSWORD,
      server: process.env.DB_SERVER_URL!,
      port: parseInt(process.env.DB_SERVER_PORT!),
      database: process.env.DB_NAME,
      options: mssqlOptions,
    },
    () => console.log("Connected as Admin")
  ).connect(),
};

export type DbName = keyof typeof dbs;

export async function getDb(name: DbName) {
  return (await dbs[name]).request();
}
