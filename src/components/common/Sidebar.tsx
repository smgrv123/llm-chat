import { UserChatDetails } from '@/src/lib/types';
import SidebarButton from './SidebarButton';

export default function Sidebar({ chats }: { chats: UserChatDetails[] }) {
  return (
    <section className="h-full px-4 text-secondaryText bg-background">
      <article>
        {chats.map(({ updatedAt, chatTitle, id }, index) => (
          <div key={index} className="py-2">
            <SidebarButton updatedAt={updatedAt} chatTitle={chatTitle} chatId={id} />
          </div>
        ))}
      </article>
    </section>
  );
}
