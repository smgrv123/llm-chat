import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { sendUserChats } from '@/server/queries';
import InputHolder from '@/src/components/chat/InputHolder';
import { OnboardingFormEnum, UserTypeEnum } from '@/src/lib/types';

export default function Home() {
  const handleFormAction = async (formData: FormData) => {
    'use server';
    const userId = cookies().get(OnboardingFormEnum.USER_ID)?.value;
    const prompt = formData.get('inputPrompt') as string;
    let redirectPath: string | null = null;

    try {
      if (userId) {
        const response = await sendUserChats(userId, prompt, [
          { chatMessage: prompt, messageSender: UserTypeEnum.USER, timeStamp: dayjs().toDate() },
        ]);
        console.log('response', response);
        redirectPath = `/search/${response[0].id}`;
      } else throw Error;
    } catch (error) {
      console.error('error', error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)] flex-col items-center justify-center bg-secondaryBackground">
      <InputHolder handleFormAction={handleFormAction} />
    </section>
  );
}
