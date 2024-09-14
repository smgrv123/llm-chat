import { UserChatDetails } from '@/src/lib/types';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function Sidebar({ chats }: { chats: UserChatDetails[] }) {
  const hrefHandler = (id: string) => `search/${id}`;

  return (
    <section className="h-full px-4 text-secondaryText bg-background">
      <article className="py-2">
        {chats.map(({ timeStamp, chatTitle, id }, index) => (
          <Link key={index} href={hrefHandler(id)}>
            <div className="text-accent">{dayjs(timeStamp).format('DD MM YYYY')}</div>
            <div>{chatTitle}</div>
          </Link>
        ))}
      </article>
    </section>
  );
}
