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
    <Link
      prefetch={true}
      href={`/search/${chatId}`}
      className="flex items-center w-full px-3 py-2 hover:bg-gray-100/10 rounded-lg gap-3"
    >
      <div className="flex-1 min-w-0">
        <div className="text-accent text-sm">{dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</div>
        <div className="text-base overflow-hidden text-ellipsis whitespace-nowrap" title={chatTitle}>
          {chatTitle}
        </div>
      </div>

      <div className="flex-shrink-0">
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
      </div>
    </Link>
  );
}
