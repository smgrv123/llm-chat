import { HTMLInputTypeAttribute } from 'react';

export type OnboardingFormType = {
  fieldName: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  inputName: 'userName' | 'gptKey';
};
