import { UserChatDetails } from '@/src/lib/types';
import SidebarButton from './SidebarButton';

export default function Sidebar({ chats }: { chats: UserChatDetails[] }) {
  return (
    <section className="h-[calc(100vh-64px)] px-4 text-secondaryText bg-background overflow-scroll">
      <article>
        {chats.reverse().map(({ updatedAt, chatTitle, id }, index) => (
          <div key={index} className="py-2">
            <SidebarButton updatedAt={updatedAt} chatTitle={chatTitle} chatId={id} />
          </div>
        ))}
      </article>
    </section>
  );
}
