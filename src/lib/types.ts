import { HTMLInputTypeAttribute } from 'react';

export type OnboardingFormType = {
  fieldName: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  inputName: 'userName' | 'gptKey';
};

export type UserChatDetails = {
  createdAt: Date;
  updatedAt: Date;
  chatTitle: string;
  chatHistory: UserChatHistory[];
  id: string;
};

export type UserDetails = {
  id: string;
  fullName: string;
  chats: UserChatDetails[];
};

export type UserChatHistory = {
  messageSender: UserTypeEnum.LLM | UserTypeEnum.USER;
  chatMessage: string;
  timeStamp: Date;
};

export enum OnboardingFormEnum {
  USER_NAME = 'userName',
  GPT_KEY = 'gptKey',
  USER_ID = 'userId',
}

export enum UserTypeEnum {
  USER = 'user',
  LLM = 'llm',
}

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};
