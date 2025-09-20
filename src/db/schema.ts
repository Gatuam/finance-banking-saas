
import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import {createInsertSchema} from 'drizzle-zod'

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const account = pgTable('account', {
    id: text('id').primaryKey().$defaultFn(()=> createId()),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
})

export const insertAccountSchema = createInsertSchema(account)

export const categories = pgTable('categories', {
  id : text('id').primaryKey().$defaultFn(()=> createId()),
  plaudId : text('plaid_id'),
  name : text('name').notNull(),
  userId: text('user_id').notNull(),

});

export const insertCategoriesSchema = createInsertSchema(categories)