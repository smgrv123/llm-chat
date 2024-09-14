'use client';

import { sendUserChats } from '@/server/queries';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useRef, useState } from 'react';

export default function InputHolder({ userId }: { userId: string }) {
  const [prompt, setprompt] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const sendUserChatHandler = async () => {
    try {
      const response = await sendUserChats('41a22e3b-d6c7-4499-82fc-aba4e98b19ed', prompt, [
        { chatMessage: prompt, messageSender: 'user', timeStamp: dayjs().toDate() },
      ]);
      console.log('respnose', response);
      redirect(`/search/${response[0].id}`);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <section className="flex flex-row items-center gap-5 p-5 h-[120px] w-[550px] rounded-lg border-4 border-background">
      <textarea
        ref={textAreaRef}
        value={prompt}
        onChange={(e) => {
          e.preventDefault();
          setprompt(e.target.value);
          if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
          }
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await sendUserChatHandler();
          }
        }}
        className="flex-1 bg-inherit"
        placeholder="Ask Anything...."
      />
      <button
        className="p-1 rounded-full bg-accent"
        onClick={async () => await sendUserChatHandler()}
      >
        <ChevronRight color="#1E1E1E" size={25} />
      </button>
    </section>
  );
}
