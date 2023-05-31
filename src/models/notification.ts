
type TTypeWebhook = 'incomingMessageReceived' | 'incomingCall';

type TInstanceData = {
  idInstance: number,
  wid: string,
  typeInstance: string
};

type TSenderData = {
  chatId: string,
  chatName: string,
  sender: string,
  senderName: string,
};

type TQuotedMessageData ={
  stanzaId: string,
  participant: string,
  typeMessage?: string,
  downloadUrl?: string,
  caption?: string,
  fileName?: string,
  jpegThumbnail?: string,
}

type TImageMessageData = {
  typeMessage: 'imageMessage' | 'videoMessage',
  fileMessageData: {
    downloadUrl: string,
    caption: string,
    fileName: string,
    jpegThumbnail: string,
    mimeType: string,
  }
};

type TTextMessageData = {
  typeMessage: 'textMessage'
  textMessageData: {
    textMessage: string,
  }
}

type TExtendedTextMessageData = {
  typeMessage: 'quotedMessage' | 'extendedTextMessage',
  extendedTextMessageData: {
    text: string,
    stanzaI?: string,
    participant?: string,
    description?: string,
    title?: string,
    previewType?: string,
    jpegThumbnail?: string,
    forwardingScore?: number,
    isForwarded?: boolean,
  },
  quotedMessage?: TQuotedMessageData,
};

type TReactionMessage = {
  typeMessage: 'reactionMessage',
  extendedTextMessageData: {
    text: string
  },
  quotedMessage: TQuotedMessageData,
}

type TIncomingMessageBody = {
  typeWebhook: TTypeWebhook,
  instanceData: TInstanceData,
  timestamp: number,
  idMessage: string,
  senderData: TSenderData,
  messageData: TTextMessageData | TImageMessageData | TExtendedTextMessageData | TReactionMessage,
};

// type TIncomingCall = {
//   from: string,
//   typeWebhook: TTypeWebhook,
//   instanceData: TInstanceData,
//   timestamp: number,
//   idMessage: string,
// };

export type TNotificationType = {
  receiptId: number,
  body: TIncomingMessageBody,
} | undefined;

