import { pgTable, text, timestamp, decimal } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const gyms = pgTable('gyms', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  title: text('title').notNull(),
  description: text("email").notNull().unique(),
  phone: text("phone"),
  latitude: decimal('latitude').notNull(),
  longitude: decimal('longitude').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});


