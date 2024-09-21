import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getUserDetails } from '@/server/queries';
import Navbar from '@/src/components/common/Navbar';
import Sidebar from '@/src/components/common/Sidebar';
import { OnboardingFormEnum, UserDetails } from '@/src/lib/types';

export default async function ChatLayout({ children }: { children: ReactNode }) {
  if (!cookies().get(OnboardingFormEnum.GPT_KEY)) {
    redirect('/');
  }
  const userId = cookies().get(OnboardingFormEnum.USER_ID)?.value;

  let response;
  try {
    if (userId) response = (await getUserDetails(userId)) as UserDetails | undefined;
  } catch (error) {
    console.error('error in getting userDetails', error);
  }

  return (
    response && (
      <>
        <Navbar userName={response?.fullName} />
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <Sidebar chats={response?.chats} />
          </div>
          <main className="col-span-5">{children}</main>
        </div>
      </>
    )
  );
}
