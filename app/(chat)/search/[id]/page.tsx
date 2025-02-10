import { getUserChatDetails } from '@/server/queries';
import ChatInputHolder from '@/src/components/chat/ChatInputHolder';
import CodeBlockWithCopy from '@/src/components/common/CodeBlockWithCopy';
import { generateOpenAIResponse } from '@/src/lib/llm';
import Logger from '@/src/lib/Logger';
import { UserChatHistory, UserTypeEnum } from '@/src/lib/types';
import clsx from 'clsx';
import 'highlight.js/styles/github.css';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';

export default async function Home({ params }: { params: { id: string } }) {
  let chats: { id: string; chatHistory: UserChatHistory[] } | undefined = undefined;
  try {
    chats = (await getUserChatDetails(params.id)) as { id: string; chatHistory: UserChatHistory[] } | undefined;
    if (!chats) throw new Error('No Chats Found with this ID');
  } catch (error) {
    Logger.error('error', error);
    redirect('/home');
  }

  const formChatInputHanlder = async (formData: FormData) => {
    'use server';
    const prompt = formData.get('chatInputPrompt') as string;
    try {
      if (chats) await generateOpenAIResponse(chats?.id, prompt);

      revalidatePath(`/search/${params.id}`);
    } catch (error) {
      Logger.error('error', error);
    }
  };

  return (
    <section className="flex flex-col h-[calc(100vh-64px)] bg-secondaryBackground">
      {chats && (
        <div className="flex-1 overflow-y-auto p-4">
          {chats.chatHistory.map(({ chatMessage, messageSender }, index) => (
            <div
              key={index}
              className={clsx('flex flex-col mb-4', messageSender === UserTypeEnum.USER ? 'items-end' : 'items-start')}
            >
              <Markdown
                rehypePlugins={[rehypeSanitize, rehypeHighlight]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <CodeBlockWithCopy language={match[1]}>{children}</CodeBlockWithCopy>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
                className={clsx(
                  'p-3 rounded-lg max-w-[70%]',
                  messageSender === UserTypeEnum.USER
                    ? 'bg-tertiaryBackground text-primaryText'
                    : 'bg-inherit text-primaryText'
                )}
              >
                {chatMessage}
              </Markdown>
            </div>
          ))}
        </div>
      )}
      <ChatInputHolder formChatInputHanlder={formChatInputHanlder} />
    </section>
  );
}
