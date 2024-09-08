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
  chatHistory: { messageSender: 'user' | 'llm'; chatMessage: string; timeStamp: Date }[]
) {
  const response = await db
    .insert(ChatsTable)
    .values({
      chatTitle,
      chatHistory,
      userId,
    })
    .returning({
      timeStamp: ChatsTable.timeStamp,
      chatTitle: ChatsTable.chatTitle,
      chatHistory: ChatsTable.chatHistory,
    });

  return response;
}

export async function getUserDetails(userId: string) {
  const response = await db.query.UserTable.findFirst({
    columns: { fullName: true, id: true },
    with: {
      chats: {
        columns: {
          timeStamp: true,
          chatTitle: true,
          chatHistory: true,
        },
      },
    },
    where: (table, { eq }) => eq(table.id, userId),
  });
  return response;
}
