'use client';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const chatJson: { messageSender: 'user' | 'llm'; chatMessage: string }[] = [
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'llm',
  },
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'user',
  },
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'llm',
  },
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'user',
  },
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'llm',
  },
  {
    chatMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    messageSender: 'user',
  },
];
export default function Home() {
  const [prompt, setprompt] = useState('');
  const [chats, setchats] = useState(chatJson);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="flex flex-col h-[calc(100vh-64px)] bg-secondaryBackground">
      <div className="flex-1 overflow-y-auto p-4">
        {chats.reverse().map(({ chatMessage, messageSender }, index) => (
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
      <div className="flex items-center p-4 border-t">
        <textarea
          ref={textAreaRef}
          placeholder="Ask your questions here...."
          value={prompt}
          onChange={(e) => {
            e.preventDefault();
            setprompt(e.target.value);
            if (textAreaRef.current) {
              textAreaRef.current.style.height = 'auto';
              textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
            }
          }}
          className="flex-1 p-2 mr-4 rounded-lg border text-wrap"
          rows={1}
        />
        <button
          onClick={() => {
            setchats((prevState) => [...prevState, { messageSender: 'user', chatMessage: prompt }]);
            setprompt('');
          }}
          className="p-1 rounded-full bg-accent text-white"
        >
          <ChevronRight color="#1E1E1E" size={25} />
        </button>
      </div>
    </section>
  );
}
