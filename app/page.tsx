import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { sendUserDetails } from '@/server/queries';
import OnboardingForm from '@/src/components/home/OnboardingForm';
import { revalidatePath } from 'next/cache';

export default function Home() {
  if (cookies().get('gptKey')) {
    redirect('/home');
  }

  const createMessage = async (formData: FormData) => {
    'use server';
    const userName = formData.get('userName') as string;
    const llmKey = formData.get('gptKey') as string;

    const { set } = cookies();
    try {
      const response = await sendUserDetails(userName);
      set('gptKey', llmKey);
      set('userId', response[0].id);
      revalidatePath('/');
    } catch (error) {
      console.error('Error in setting user details', error);
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
