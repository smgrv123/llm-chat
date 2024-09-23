import { getUserChatDetails, sendUserChats, updateUserChatDetails } from '@/server/queries';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { Message, OnboardingFormEnum, UserChatHistory, UserTypeEnum } from './types';

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

export async function generateOpenAIResponse(conversationId: string, prompt: string) {
  const openai = new OpenAI({
    apiKey: cookies().get(OnboardingFormEnum.GPT_KEY)?.value,
  });
  const conversation = await getUserChatDetails(conversationId);
  if (!conversation) throw new Error('Conversation not found');

  const prevMessage: Message[] = (conversation.chatHistory as UserChatHistory[]).map((i) => ({
    role: i.messageSender === UserTypeEnum.LLM ? 'assistant' : 'user',
    content: i.chatMessage,
  }));

  const messages: Message[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
    ...prevMessage,
    { role: 'user', content: prompt },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
  });

  const assistantMessage: UserChatHistory[] = [
    {
      messageSender: UserTypeEnum.LLM,
      chatMessage: response.choices[0].message.content || '',
      timeStamp: dayjs().toDate(),
    },
  ];

  await updateUserChatDetails(
    conversationId,
    [
      ...(conversation.chatHistory as UserChatHistory[]),
      { chatMessage: prompt, messageSender: UserTypeEnum.USER, timeStamp: dayjs().toDate() },
      ...assistantMessage,
    ],
    dayjs().toDate()
  );
}

export async function startOpenAIConversation(userId: string, prompt: string) {
  const openai = new OpenAI({
    apiKey: cookies().get(OnboardingFormEnum.GPT_KEY)?.value,
  });
  const messages: Message[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];

  const responseOpenAI = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
  });

  const assistantMessage: UserChatHistory[] = [
    {
      messageSender: UserTypeEnum.LLM,
      chatMessage: responseOpenAI.choices[0].message.content || '',
      timeStamp: dayjs().toDate(),
    },
  ];

  const response = await sendUserChats(userId, prompt.slice(0, 254), [
    { chatMessage: prompt, messageSender: UserTypeEnum.USER, timeStamp: dayjs().toDate() },
    ...assistantMessage,
  ]);

  return response;
}

// export async function generateAnthropicResponse(conversationId: string, prompt: string) {
//   const conversation = await getUserChatDetails(conversationId);
//   if (!conversation) throw new Error('Conversation not found');

//   const conversationHistory = (conversation.chatHistory as UserChatHistory[])
//     .map((msg) => `${msg.chatMessage === UserTypeEnum.USER ? 'Human' : 'Assistant'}: ${msg.chatMessage}`)
//     .join('\n\n');

//   const fullPrompt = `${conversationHistory}\n\nHuman: ${prompt}\n\nAssistant:`;

//   const response = await anthropic.completions.create({
//     model: 'claude-3-5-sonnet-20240620',
//     prompt: fullPrompt,
//     max_tokens_to_sample: 300,
//   });

//   const assistantMessage: UserChatHistory[] = [
//     {
//       messageSender: UserTypeEnum.LLM,
//       chatMessage: response.completion,
//       timeStamp: dayjs().toDate(),
//     },
//   ];

//   //   conversationStore.addMessage(conversationId, { role: 'user', content: prompt });
//   //   conversationStore.addMessage(conversationId, assistantMessage);

//   await updateUserChatDetails(conversationId, assistantMessage, dayjs().toDate());

//   await updateUserChatDetails(
//     conversationId,
//     [{ chatMessage: prompt, messageSender: UserTypeEnum.USER, timeStamp: dayjs().toDate() }],
//     dayjs().toDate()
//   );
// }
