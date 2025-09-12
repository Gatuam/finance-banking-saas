import { Hono } from "hono";
import { handle } from "hono/vercel";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get(
    "/hello/:hi",
    zValidator(
      "param",
      z.object({
        hi: z.string(),
      })
    ),
    (c) => {
      const text = c.req.valid("param");

      return c.json({
        message: "Lee",
        text: text,
      });
    }
  );

export const GET = handle(app);
export const POST = handle(app);
