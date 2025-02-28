import { unique } from 'drizzle-orm/mysql-core';
import { serial, date, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export type UserEntity = typeof usersTable;

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  email: text('email').notNull().unique(),
  /*   birthdate: date("birthdate").notNull(), */
  image: varchar('image', { length: 500 }),
  password: text('password').notNull(),
  salt: text('salt').notNull(),
});
