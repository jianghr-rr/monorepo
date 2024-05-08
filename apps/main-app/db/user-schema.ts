import { sql } from 'drizzle-orm';
import {
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

// 这个表存储了用户账户相关的信息，如用户的身份验证令牌、访问令牌、提供商信息等。
export const accounts = mysqlTable(
  'accounts',
  {
    // 账户的唯一标识符。
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    // 与该账户关联的用户的唯一标识符。
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    // 提供商的名称
    provider: varchar('provider', { length: 255 }).notNull(),
    // 提供商分配的账户标识符
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    access_token: text('access_token'),
    expires_in: int('expires_in'),
    id_token: text('id_token'),
    refresh_token: text('refresh_token'),
    refresh_token_expires_in: int('refresh_token_expires_in'),
    scope: varchar('scope', { length: 255 }),
    token_type: varchar('token_type', { length: 255 }),
    createdAt: timestamp('createdAt')
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp('updatedAt')
      .default(sql`now()`)
      .onUpdateNow()
      .notNull(),
  },
  // 索引
  // providerProviderAccountIdIndex：使用提供商和提供商账户ID创建的唯一索引，以确保每个账户在数据库中是唯一的。
  // userIdIndex：针对用户ID的索引，用于提高检索效率。
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      'accounts__provider__providerAccountId__idx'
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index('accounts__userId__idx').on(account.userId),
  })
);

// 这个表用于管理用户会话信息，包括会话令牌、会话过期时间等。
export const sessions = mysqlTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    // 会话令牌
    sessionToken: varchar('sessionToken', { length: 255 }).notNull(),
    // 与会话相关联的用户的唯一标识符
    userId: varchar('userId', { length: 255 }).notNull(),
    // 会话过期时间
    expires: datetime('expires').notNull(),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`now()`)
      .onUpdateNow(),
  },
  // 使用会话令牌创建的唯一索引，以确保每个会话在数据库中是唯一的。
  // 针对用户ID的索引，用于提高检索效率。
  (session) => ({
    sessionTokenIndex: uniqueIndex('sessions__sessionToken__idx').on(
      session.sessionToken
    ),
    userIdIndex: index('sessions__userId__idx').on(session.userId),
  })
);

// 这个表存储了用户的基本信息，如用户名、电子邮件地址等
export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified'),
    image: varchar('image', { length: 255 }),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`now()`)
      .onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email),
  })
);

// 这个表用于管理用户帐户验证令牌，以确保安全地验证用户电子邮件地址等操作
export const verificationTokens = mysqlTable(
  'verification_tokens',
  {
    // 验证令牌的唯一标识符
    identifier: varchar('identifier', { length: 255 }).primaryKey().notNull(),
    // 验证令牌的内容
    token: varchar('token', { length: 255 }).notNull(),
    // 验证令牌过期时间
    expires: datetime('expires').notNull(),
    // 验证令牌创建时间
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    // 验证令牌信息更新时间
    updated_at: timestamp('updated_at')
      .notNull()
      .default(sql`now()`)
      .onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
      verificationToken.token
    ),
  })
);
