import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const insertAccountSchema = createInsertSchema(account);

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  plaudId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const insertCategoriesSchema = createInsertSchema(categories);

export const transcations = pgTable("transcations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date").notNull(),
  accountId: text("account_id").references(() => account.id, {
    onDelete: "cascade",
  }),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

export const accountsRelation = relations(account, ({ many }) => ({
  transcations: many(transcations),
}));

export const categoryRelation = relations(categories, ({ many }) => ({
  transcations: many(transcations),
}));

export const transcationstrlations = relations(transcations, ({ one }) => ({
  account: one(account, {
    fields: [transcations.accountId],
    references: [account.id],
  }),
  categories: one(categories, {
    fields: [transcations.categoryId],
    references: [categories.id],
  }),
}));

export const insertTransactionSchema = createInsertSchema(transcations, {
  date: z.coerce.date(),
});
