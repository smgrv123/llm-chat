import { UserChatDetails } from '@/src/lib/types';
import dayjs from 'dayjs';
import { headers } from 'next/headers';
import Link from 'next/link';

export default function Sidebar({ chats }: { chats: UserChatDetails[] }) {
  const hrefHandler = (id: string) => {
    if (headers().get('referer')?.includes('search')) return id;
    return `search/${id}`;
  };

  return (
    <section className="h-full px-4 text-secondaryText bg-background">
      <article>
        {chats.map(({ updatedAt, chatTitle, id }, index) => (
          <div key={index} className="py-2">
            <Link href={hrefHandler(id)}>
              <div className="text-accent">{dayjs(updatedAt).format('DD/MM/YYYY hh:mm:ss')}</div>
              <div className="line-clamp-1">{chatTitle}</div>
            </Link>
          </div>
        ))}
      </article>
    </section>
  );
}
