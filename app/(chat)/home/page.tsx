import InputHolder from '@/src/components/chat/InputHolder';
import { OnboardingFormEnum } from '@/src/lib/types';
import { cookies } from 'next/headers';

export default function Home() {
  const userId = cookies().get(OnboardingFormEnum.USER_ID)?.value!;

  return (
    <section className="flex h-[calc(100vh-64px)] flex-col items-center justify-center bg-secondaryBackground">
      <InputHolder userId={userId} />
    </section>
  );
}
