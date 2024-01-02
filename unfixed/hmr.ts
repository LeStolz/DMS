import type { Express } from "express";
import { config } from "dotenv";
import http from "http";
import hmr from "node-hmr";

config();

let app: Express;

hmr(
  async () => {
    ({ default: app } = await import("./index"));
  },
  { watchFilePatterns: ["**/*.ts", "**/*.tsx"] }
);

const server = http.createServer((req, res) => app(req, res));

server.listen(process.env.PORT!, () => {
  console.log(`Server listening on port ${process.env.PORT!}`);
});
