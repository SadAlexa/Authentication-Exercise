import { pgTable, serial, integer, text, date } from 'drizzle-orm/pg-core';
import { usersTable } from 'schema';

export const accessLogTable = pgTable('accesslog', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  action: text('action'),
  timestamp: date('timestamp').notNull(),
});
