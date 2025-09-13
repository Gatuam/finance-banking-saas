
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const account = pgTable('account', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
})