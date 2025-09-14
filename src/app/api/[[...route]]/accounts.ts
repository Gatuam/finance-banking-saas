import { db } from "@/db";
import { account, insertAccountSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { currentUser } from "@clerk/nextjs/server";

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
        id: account.id,
        name: account.name,
      })
      .from(account)
      .where(eq(account.userId, auth.userId));
    return c.json({ data });
  })
  .post(
    "/",
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      try {
        const user = await currentUser();
        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const values = c.req.valid("json");

        const [data] = await db
          .insert(account)
          .values({ userId: user?.id, name: values.name })
          .returning();

        return c.json({ data });
      } catch (err: any) {
        console.error("POST /accounts error:", err);
        return c.json({ error: err.message || "Server error" }, 500);
      }
    }
  );

export default app;
