import { jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
});

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  timeStamp: timestamp('timeStamp', { mode: 'date' }).defaultNow().notNull(),
  chatTitle: varchar('chatTitle', { length: 255 }).notNull(),
  chatHistory: jsonb('chatHistory')
    .$type<{ messageSender: 'user' | 'llm'; chatMessage: string; timeStamp: Date }>()
    .array(),
  userId: uuid('userId')
    .references(() => UserTable.id)
    .notNull(),
});
