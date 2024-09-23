'use client';

import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function InputHolder({ handleFormAction }: { handleFormAction: (formData: FormData) => Promise<void> }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section>
      <form
        ref={formRef}
        action={handleFormAction}
        className={`flex flex-row items-center gap-5 p-5 w-[550px] h-[${70 + parseInt(textAreaRef.current?.style.height || '')}px] rounded-lg border-4 border-background text-white`}
      >
        <textarea
          ref={textAreaRef}
          onChange={() => {
            if (textAreaRef.current) {
              textAreaRef.current.style.height = 'auto';
              textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
            }
          }}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          className="flex-1 bg-inherit px-1"
          placeholder="Ask Anything...."
          name="inputPrompt"
        />
        <button className="p-1 rounded-full bg-accent">
          <ChevronRight color="#1E1E1E" size={25} />
        </button>
      </form>
    </section>
  );
}
