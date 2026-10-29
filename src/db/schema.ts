import {
  char,
  date,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/mysql-core';

export const chatConversations = mysqlTable(
  'chat_conversations',
  {
    id: char('id', { length: 36 }).primaryKey(),
    visitorHash: char('visitor_hash', { length: 64 }).notNull(),
    day: date('day', { mode: 'string' }).notNull(),
    lastResponseId: varchar('last_response_id', { length: 255 }),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
  },
  (table) => [uniqueIndex('chat_visitor_day').on(table.visitorHash, table.day)]
);

export const chatTurns = mysqlTable(
  'chat_turns',
  {
    id: char('id', { length: 36 }).primaryKey(),
    conversationId: char('conversation_id', { length: 36 })
      .notNull()
      .references(() => chatConversations.id),
    question: text('question').notNull(),
    answer: text('answer'),
    status: mysqlEnum('status', ['pending', 'completed', 'failed'])
      .default('pending')
      .notNull(),
    errorMessage: varchar('error_message', { length: 255 }),
    reservedTokens: int('reserved_tokens', { unsigned: true }).notNull(),
    inputTokens: int('input_tokens', { unsigned: true }),
    outputTokens: int('output_tokens', { unsigned: true }),
    chargedTokens: int('charged_tokens', { unsigned: true })
      .default(0)
      .notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
  },
  (table) => [
    index('chat_conversation_turns').on(table.conversationId, table.createdAt)
  ]
);

export const chatDailyUsage = mysqlTable('chat_daily_usage', {
  day: date('day', { mode: 'string' }).primaryKey(),
  usedTokens: int('used_tokens', { unsigned: true }).default(0).notNull(),
  reservedTokens: int('reserved_tokens', { unsigned: true })
    .default(0)
    .notNull()
});
