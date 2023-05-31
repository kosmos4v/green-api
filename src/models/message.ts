export type TMessageType = 'incoming' | 'outgoing' | undefined;

export type TMessage = {
  messageId: string,
  text: string, 
  timestamp: string,
  type: TMessageType,
}

