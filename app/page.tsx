import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { sendUserDetails } from '@/server/queries';
import OnboardingForm from '@/src/components/home/OnboardingForm';
import Logger from '@/src/lib/Logger';
import { OnboardingFormEnum } from '@/src/lib/types';

export default function Home() {
  if (cookies().get(OnboardingFormEnum.GPT_KEY)) {
    redirect('/home');
  }

  const createMessage = async (formData: FormData) => {
    'use server';
    const userName = formData.get(OnboardingFormEnum.USER_NAME) as string;
    const llmKey = formData.get(OnboardingFormEnum.GPT_KEY) as string;

    try {
      const response = await sendUserDetails(userName);
      cookies().set(OnboardingFormEnum.GPT_KEY, llmKey);
      cookies().set(OnboardingFormEnum.USER_ID, response[0].id);
      redirect('/home');
    } catch (error) {
      Logger.error('Error in setting user details', error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-primaryText">
      <section>
        <OnboardingForm createMessage={createMessage} />
      </section>
    </main>
  );
}
