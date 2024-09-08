import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getUserDetails } from '@/server/queries';
import Navbar from '@/src/components/common/Navbar';
import Sidebar from '@/src/components/common/Sidebar';

export default async function ChatLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('gptKey')) {
    redirect('/');
  }
  const userId = cookies().get('userId');

  let response;
  try {
    response = await getUserDetails(userId?.value!);
  } catch (error) {
    console.error('error in getting userDetails', error);
  }

  return (
    response && (
      <>
        <Navbar userName={response?.fullName} />
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <main className="col-span-5">{children}</main>
        </div>
      </>
    )
  );
}
