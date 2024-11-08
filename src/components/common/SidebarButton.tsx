'use client';

import { deleteUserChat } from '@/server/queries';
import Logger from '@/src/lib/Logger';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SidebarButton({
  updatedAt,
  chatTitle,
  chatId,
}: {
  updatedAt: Date;
  chatTitle: string;
  chatId: string;
}) {
  const router = useRouter();

  return (
    <Link prefetch={true} href={`/search/${chatId}`} className="flex items-center text-left gap-1">
      <div className="flex-1">
        <div className="text-accent">{dayjs(updatedAt).format('DD/MM/YYYY hh:mm:ss')}</div>
        <div className="line-clamp-1">{chatTitle}</div>
      </div>

      <Trash
        color="#7F5E37"
        onClick={async (e) => {
          e.stopPropagation();
          try {
            deleteUserChat(chatId);
            router.refresh();
          } catch (error) {
            Logger.log('error in deleting user chat', error);
          }
        }}
      />
    </Link>
  );
}
