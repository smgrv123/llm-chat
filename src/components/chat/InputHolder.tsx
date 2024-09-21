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
        className="flex flex-row items-center gap-5 p-5 h-[120px] w-[550px] rounded-lg border-4 border-background"
      >
        <textarea
          ref={textAreaRef}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          className="flex-1 bg-inherit"
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
