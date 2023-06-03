export type TMessageType = 'incoming' | 'outgoing' | '';

export type TMessage = {
  messageId: string,
  text: string,
  timestamp: string,
  type: TMessageType,
};
