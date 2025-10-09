import { db } from "@/db";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { auth, currentUser } from "@clerk/nextjs/server";
import * as z from "zod";
import {
  transcations,
  insertTransactionSchema,
  categories,
  account,
} from "@/db/schema";
import { parse, subDays } from "date-fns";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
      })
    ),
    async (c) => {
      const { from, to, accountId } = c.req.valid("query");
      const user = await currentUser();
      if (!user?.id) {
        return c.json(
          {
            error: "Unauthorized",
          },
          401
        );
      }
      const defaultTo = new Date();
      const defaultFrom = subDays(defaultTo, 30);
      const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;

      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const data = await db
        .select({
          id: transcations.id,
          category: categories.name,
          categoryId: transcations.categoryId,
          date: transcations.date,
          payee: transcations.payee,
          amount: transcations.amount,
          notes: transcations.notes,
          accountId: transcations.accountId,
          account: account.name,
        })
        .from(transcations)
        .innerJoin(account, eq(transcations.accountId, account.id))
        .leftJoin(categories, eq(transcations.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(transcations.accountId, accountId) : undefined,
            eq(account.userId, user.id),
            gte(transcations.date, startDate),
            lte(transcations.date, endDate)
          )
        )
        .orderBy(desc(transcations.date));
      return c.json({ data });
    }
  )
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
          id: transcations.id,
          categoryId: transcations.categoryId,
          date: transcations.date,
          payee: transcations.payee,
          amount: transcations.amount,
          notes: transcations.notes,
          accountId: transcations.accountId,
        })
        .from(transcations)
        .innerJoin(account, eq(transcations.accountId, account.id))
        .where(
          and(eq(transcations.id, id), eq(account.userId, account.userId))
        );
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      insertTransactionSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      try {
        const user = await currentUser();
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const values = c.req.valid("json");

        const [data] = await db
          .insert(transcations)
          .values({
            ...values,
          })
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
        const transactionsToDelete = db.$with("transactions_to_delete").as(
          db
            .select({ id: transcations.id })
            .from(transcations)
            .innerJoin(account, eq(transcations.accountId, account.id))
            .where(
              and(
                inArray(transcations.id, values.ids),
                eq(account.userId, user.id)
              )
            )
        );
        const data = await db
          .with(transactionsToDelete)
          .delete(transcations)
          .where(
            inArray(
              transcations.id,
              sql`(select id from ${transactionsToDelete})`
            )
          )
          .returning({
            id: transcations.id,
          });
        return c.json(data);
      } catch (error: any) {
        return c.json({ error: error?.message || "Server error" }, 500);
      }
    }
  )
  .post(
    "/bulk-create",
    zValidator(
      "json",
      z.array(
        insertTransactionSchema.omit({
          id: true,
        })
      )
    ),
    async (c) => {
      try {
        const user = await currentUser();
        const values = c.req.valid("json");

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const data = await db
          .insert(transcations)
          .values(
            values.map((value) => ({
              ...value,
            }))
          )
          .returning();

        return c.json({ data });
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
      insertTransactionSchema.omit({
        id: true,
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
      const transactionsToUpdate = db.$with("transactions_to_update").as(
        db
          .select({ id: transcations.id })
          .from(transcations)
          .innerJoin(account, eq(transcations.accountId, account.id))
          .where(and(eq(account.userId, user.id)))
      );
      const [data] = await db
        .with(transactionsToUpdate)
        .update(transcations)
        .set(values)
        .where(
          inArray(
            transcations.id,
            sql`(select id from ${transactionsToUpdate})`
          )
        )
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
      const transactionsToDelete = db.$with("transactions_to_delete").as(
        db
          .select({ id: transcations.id })
          .from(transcations)
          .innerJoin(account, eq(transcations.accountId, account.id))
          .where(and(eq(account.userId, user.id)))
      );
      const [data] = await db
        .with(transactionsToDelete)
        .delete(transcations)
        .where(
          inArray(
            transcations.id,
            sql`(select id from ${transactionsToDelete})`
          )
        )
        .returning({
          id: transcations.id,
        });
      if (!data) {
        return c.json({ error: "Not Found" }, 401);
      }
      return c.json(data);
    }
  );

export default app;
