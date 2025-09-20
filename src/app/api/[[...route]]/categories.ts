import { db } from "@/db";
import { categories, insertCategoriesSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { currentUser } from "@clerk/nextjs/server";
import * as z from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json(
        {
          error: "Unauthorized",
        },
        401
      );
    }
    const data = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(eq(categories.userId, auth.userId));
    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Bad Request Missing id" }, 400);
      }
      if (!user) {
        return c.json({ error: "Unauthozrized" }, 401);
      }
      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(and(eq(categories.userId, user.id), eq(categories.id, id)));
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", insertCategoriesSchema.pick({ name: true })),
    async (c) => {
      try {
        const user = await currentUser();
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const values = c.req.valid("json");

        const [data] = await db
          .insert(categories)
          .values({ userId: user?.id, name: values.name })
          .returning();

        return c.json({ data });
      } catch (err: any) {
        console.error("POST /categories error:", err);
        return c.json({ error: err.message || "Server error" }, 500);
      }
    }
  )
  .post(
    "/bulik-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      try {
        const user = await currentUser();
        const values = c.req.valid("json");
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }
        const data = await db
          .delete(categories)
          .where(
            and(
              eq(categories.userId, user?.id),
              inArray(categories.id, values.ids)
            )
          )
          .returning({
            id: categories.id,
          });
        return c.json(data);
      } catch (error: any) {
        return c.json({ error: error?.message || "Server error" }, 500);
      }
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      z.object({
        name: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!user?.id || !user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      const [data] = await db
        .update(categories)
        .set(values)
        .where(and(eq(categories.userId, user?.id), eq(categories.id, id)))
        .returning();
      if (!data) {
        return c.json({ error: "Not Found" }, 401);
      }
      return c.json(data);
    }
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      if (!user?.id || !user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      const [data] = await db
        .delete(categories)
        .where(and(eq(categories.userId, user?.id), eq(categories.id, id)))
        .returning({
          id: categories.id,
        });
      if (!data) {
        return c.json({ error: "Not Found" }, 401);
      }
      return c.json(data);
    }
  );

export default app;
