'use client';

import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function ChatInputHolder({
  formChatInputHanlder,
}: {
  formChatInputHanlder: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form
      ref={formRef}
      action={(e) => {
        formChatInputHanlder(e);
        formRef.current?.reset();
      }}
      className="flex items-center p-4 border-t"
    >
      <textarea
        ref={textAreaRef}
        placeholder="Ask your questions here...."
        className="flex-1 p-2 mr-4 rounded-lg border text-wrap max-h-64"
        rows={1}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }
        }}
        onChange={() => {
          if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
          }
        }}
        name="chatInputPrompt"
      />
      <button className="p-1 rounded-full bg-accent text-white">
        <ChevronRight color="#1E1E1E" size={25} />
      </button>
    </form>
  );
}
