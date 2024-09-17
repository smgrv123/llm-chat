'use client';

import { OnboardingFormEnum, OnboardingFormType } from '@/src/lib/types';

function OnboardingForm({ createMessage }: { createMessage: (formData: FormData) => void }) {
  const formFields: OnboardingFormType[] = [
    {
      fieldName: 'Name',
      inputPlaceholder: 'Enter Your Name...',
      inputType: 'text',
      inputName: OnboardingFormEnum.USER_NAME,
    },
    {
      fieldName: 'Open AI Key',
      inputPlaceholder: 'Enter The Key...',
      inputType: 'text',
      inputName: OnboardingFormEnum.GPT_KEY,
    },
  ];

  return (
    <form
      action={createMessage}
      className=" flex flex-col gap-y-2 bg-secondaryBackground p-10 rounded-lg border border-solid"
    >
      {formFields.map(({ fieldName, inputName, inputPlaceholder, inputType }, index) => (
        <div className="flex justify-between py-2" key={index}>
          <span className="px-2">{fieldName}</span>
          <input
            className="p-1 rounded-sm text-background"
            placeholder={inputPlaceholder}
            type={inputType}
            name={inputName}
          />
        </div>
      ))}
      <button className="bg-accent max-w-fit p-3 rounded-md self-end">Submit</button>
    </form>
  );
}

export default OnboardingForm;
