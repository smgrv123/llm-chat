'use server';

import { UserChatHistory } from '@/src/lib/types';
import { eq } from 'drizzle-orm';
import { db } from './db/db';
import { ChatsTable, UserTable } from './db/schema';

export async function sendUserDetails(name: string) {
  const response = await db
    .insert(UserTable)
    .values({
      fullName: name,
    })
    .returning({
      id: UserTable.id,
      fullName: UserTable.fullName,
    });
  return response;
}

export async function sendUserChats(
  userId: string,
  chatTitle: string,
  chatHistory: UserChatHistory[]
) {
  const response = await db
    .insert(ChatsTable)
    .values({
      chatTitle,
      chatHistory,
      userId,
    })
    .returning({
      createdAt: ChatsTable.createdAt,
      updatedAt: ChatsTable.updatedAt,
      chatTitle: ChatsTable.chatTitle,
      chatHistory: ChatsTable.chatHistory,
      id: ChatsTable.id,
    });

  return response;
}

export async function getUserDetails(userId: string) {
  const response = await db.query.UserTable.findFirst({
    columns: { fullName: true, id: true },
    with: {
      chats: {
        columns: {
          createdAt: true,
          updatedAt: true,
          chatTitle: true,
          id: true,
        },
      },
    },
    where: (table, { eq }) => eq(table.id, userId),
  });
  return response;
}

export async function getUserChatDetails(chatId: string) {
  const response = await db.query.ChatsTable.findFirst({
    columns: { chatHistory: true, id: true },
    where: (table, { eq }) => eq(table.id, chatId),
  });
  return response;
}

export async function updateUserChatDetails(
  chatId: string,
  chatHistory: UserChatHistory[],
  updatedAt: Date
) {
  const response = await db
    .update(ChatsTable)
    .set({
      chatHistory: chatHistory,
      updatedAt,
    })
    .where(eq(ChatsTable.id, chatId));

  return response;
}
