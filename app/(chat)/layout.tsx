import { ReactNode } from 'react';

import Navbar from '@/src/components/common/Navbar';
import Sidebar from '@/src/components/common/Sidebar';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </>
  );
}
