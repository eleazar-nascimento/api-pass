import { pgTable, text, timestamp, decimal } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from './users'
import { relations } from "drizzle-orm";
import { gyms } from "./gyms";

export const checkins = pgTable('check_ins', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  validatedAt: timestamp('validated_at'),
  userId: text('user_id').references(() => users.id, {
    onDelete: 'set null'
  }),
  gymId: text('gym_id').references(() => gyms.id, {
    onDelete: 'set null'
  })
});

export const checkinsRelations = relations(checkins, ({ one }) => {
    return {
      user: one(users, {
        fields: [checkins.userId],
        references: [users.id],
        relationName: 'user_check_in'
      }),
      gym: one(gyms, {
        fields: [checkins.gymId],
        references: [gyms.id],
        relationName: 'gym_check_in'
      })
    }
})