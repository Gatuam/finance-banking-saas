import { Hono } from "hono";
import { handle } from "hono/vercel";
import * as z from "zod";
import accounts from "./accounts";
import categories from "./categories";
import transcations from "./transactions";

const app = new Hono().basePath("/api");

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transcations", transcations);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
