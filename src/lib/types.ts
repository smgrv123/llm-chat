import { HTMLInputTypeAttribute } from 'react';

export type OnboardingFormType = {
  fieldName: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  inputName: 'userName' | 'gptKey';
};

export type UserChatDetails = {
  timeStamp: Date;
  chatTitle: string;
  chatHistory: unknown[] | null;
  id: string;
};

export type UserDetails = {
  id: string;
  fullName: string;
  chats: UserChatDetails[];
};

export enum OnboardingFormEnum {
  USER_NAME = 'userName',
  GPT_KEY = 'gptKey',
  USER_ID = 'userId',
}
