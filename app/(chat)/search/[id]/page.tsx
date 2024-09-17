import { getUserChatDetails, updateUserChatDetails } from '@/server/queries';
import ChatInputHolder from '@/src/components/chat/ChatInputHolder';
import { UserChatHistory, UserTypeEnum } from '@/src/lib/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

export default async function Home({ params }: { params: { id: string } }) {
  let chats: { id: string; chatHistory: UserChatHistory[] } | undefined = undefined;
  try {
    chats = (await getUserChatDetails(params.id)) as
      | { id: string; chatHistory: UserChatHistory[] }
      | undefined;
  } catch (error) {
    console.error('error', error);
  }

  const formChatInputHanlder = async (formData: FormData) => {
    'use server';
    const prompt = formData.get('chatInputPrompt') as string;
    try {
      if (chats) {
        const response = await updateUserChatDetails(
          chats?.id,
          [
            ...chats?.chatHistory,
            { chatMessage: prompt, messageSender: UserTypeEnum.USER, timeStamp: dayjs().toDate() },
          ],
          dayjs().toDate()
        );
      }
      revalidatePath(`/search/${params.id}`);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <section className="flex flex-col h-[calc(100vh-64px)] bg-secondaryBackground">
      {chats && (
        <div className="flex-1 overflow-y-auto p-4">
          {chats.chatHistory.reverse().map(({ chatMessage, messageSender }, index) => (
            <div
              key={index}
              className={clsx(
                'flex flex-col mb-4',
                messageSender === 'user' ? 'items-end' : 'items-start'
              )}
            >
              <div
                className={clsx(
                  'p-3 rounded-lg max-w-[70%]',
                  messageSender === 'user'
                    ? 'bg-tertiaryBackground text-primaryText'
                    : 'bg-inherit text-primaryText'
                )}
              >
                {chatMessage}
              </div>
            </div>
          ))}
        </div>
      )}
      <ChatInputHolder formChatInputHanlder={formChatInputHanlder} />
    </section>
  );
}
