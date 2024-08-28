import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    console.log('first', { llmKey, userName });

    const { set } = cookies();

    set('gptKey', llmKey);

    revalidatePath('/');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-primaryText">
      <section>
        <OnboardingForm createMessage={createMessage} />
      </section>
    </main>
  );
}
