import { TMessage } from './message';

export type TChat = {
  phone: string,
  chatId: string,
  messages: TMessage[]
};

export type TChats = Record<string, TChat>;
