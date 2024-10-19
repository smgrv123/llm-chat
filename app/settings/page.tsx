import { OnboardingFormEnum } from '@/src/lib/types';
import { ChevronLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Settings() {
  if (!cookies().get(OnboardingFormEnum.GPT_KEY)) {
    redirect('/');
  }

  const settingsItems = [
    {
      settingsName: 'Update User Details',
      path: '/settings/user-details',
    },
    {
      settingsName: 'Update Model being used',
      path: '/settings/llm-model',
    },
  ];

  // const createMessage = async (formData: FormData) => {
  //   'use server';
  //   const userName = formData.get(OnboardingFormEnum.USER_NAME) as string;
  //   const llmKey = formData.get(OnboardingFormEnum.GPT_KEY) as string;

  //   const userId = cookies().get(OnboardingFormEnum.USER_ID)?.value;

  //   try {
  //     if (userId) {
  //       const response = await updateUserDetails(userId, userName);
  //       cookies().set(OnboardingFormEnum.GPT_KEY, llmKey);
  //       cookies().set(OnboardingFormEnum.USER_ID, response[0].id);
  //       redirect('/home');
  //     } else throw new Error('userID not present');
  //   } catch (error) {
  //     Logger.error('Error in setting user details', error);
  //   }
  // };
  return (
    <section>
      <nav className="w-full flex gap-5 p-5">
        <Link href="/home">
          <ChevronLeft />
        </Link>
        <span className="">Settings</span>
      </nav>

      <ol className="px-16">
        {settingsItems.map(({ settingsName, path }, index) => (
          <li className="flex gap-3 py-3" key={index}>
            <span>{index + 1}.</span>
            <Link href={path}>{settingsName}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
