import { Hono } from "hono";
import { handle } from "hono/vercel";
import * as z from "zod";
import accounts from "./accounts";

const app = new Hono().basePath("/api");

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);


export type AppType = typeof routes;
