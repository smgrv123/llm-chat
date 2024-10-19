'use client';

import dayjs from 'dayjs';
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
    <button className="text-left" onClick={() => router.push(`/search/${chatId}`)}>
      <div className="text-accent">{dayjs(updatedAt).format('DD/MM/YYYY hh:mm:ss')}</div>
      <div className="line-clamp-1">{chatTitle}</div>
    </button>
  );
}
