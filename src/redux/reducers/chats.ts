import { handleActions } from "redux-actions";
import { TChat, TChats } from "../../models/chat";
import { TMessage } from "../../models/message";
import { TNotificationType } from "../../models/notification";

import {
    ADD_NEW_CHAT,
    SET_CURRENT_CHAT,
    SEND_MESSAGE,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_SUCCESS,
    RECEIVE_NOTIFICATION_PENDING,
    RECEIVE_NOTIFICATION_SUCCESS,
    RECEIVE_NOTIFICATION_FAILURE,
    DELETE_NOTIFICATION_PENDING,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE,
} from "../actions/chat";

export type TChatState = {
  chats: TChats,
  currentChat: TChat,
  deleteNotificationError?: string,
  isDeleteNotificationPending: boolean,
  isNotificationRendered: boolean,
  isReceiveNotificationPending: boolean,
  isSendMessagePending: boolean,
  receiptId?: number,
  receiveNotificationError?: string,
  sendMessageError?: string,
};

export type TChatAction = {
  chats: TChats,
  userId: string,
  currentChat: TChat,
  currentMessage: TMessage,
  error?: string,
  isDeleteNotificationPending: boolean,
  isReceiveNotificationPending: boolean,
  isSendMessagePending: boolean,
  isMessageDeleted: boolean,
  incomingMessageId: string,
  notification: TNotificationType,
  phone: string,
  receiptId?: number,
};

const initialState: TChatState = {
  chats: {},
  currentChat: { phone: '', chatId: '', messages:[] },
  deleteNotificationError: undefined,
  isDeleteNotificationPending: false,
  isNotificationRendered: false,
  isReceiveNotificationPending: false,
  isSendMessagePending: false,
  sendMessageError: undefined,
  receiptId: undefined,
};

export const chatReducer = handleActions<TChatState, TChatAction>({

[ADD_NEW_CHAT]: (state, { payload }) => { 
  const { phone } = payload
  const chats = {
    ...state.chats,
    [phone]: { phone: phone, chatId: phone + '@c.us', messages: [] }
  }
  return ({
    ...state,
    chats,
 })
},

[SET_CURRENT_CHAT]: (state, { payload }) => ({
  ...state,
  currentChat: payload.currentChat,
}),

[SEND_MESSAGE]: (state, { payload }) => {
  const { phone, currentMessage } = payload;
  const updatedChat = {
    ...state.currentChat,
    messages: [...state.currentChat.messages, currentMessage]
  };
  return ({
    ...state,
    currentChat: updatedChat,
    chats: {...state.chats, [phone]: updatedChat}
  })
},

[SEND_MESSAGE_PENDING]: (state, { payload }) => ({
  ...state,
  isSendMessagePending: payload.isSendMessagePending,
}),

[SEND_MESSAGE_SUCCESS]: (state, { payload }) => {
  const { incomingMessageId, currentMessage, phone } = payload;
  const updatedMessages = state.currentChat.messages
  .map((message) => message.timestamp === currentMessage.timestamp
    ? {...message, messageId: incomingMessageId} 
    : message
  );
  const updatedChat = {
    ...state.currentChat,
    messages: updatedMessages,
  };
  return ({
    ...state,
    currentChat: updatedChat,
    chats: {...state.chats, [phone]: updatedChat},
    sendMessageError: undefined,
  })
},

[SEND_MESSAGE_FAILURE]: (state, { payload }) => ({
    ...state,
    sendMessageError: payload.error,
}),

[RECEIVE_NOTIFICATION_PENDING]: (state, { payload }) => ({
  ...state,
  isReceiveNotificationPending: payload.isReceiveNotificationPending,
}),

[RECEIVE_NOTIFICATION_SUCCESS]: (state, { payload }) => {

  if (
    payload.notification
    && payload.notification.body.messageData
    && (
      payload.notification.body.messageData.typeMessage === 'textMessage'
      || payload.notification.body.messageData.typeMessage === 'quotedMessage'
      || payload.notification.body.messageData.typeMessage === 'reactionMessage'
      || payload.notification.body.messageData.typeMessage === 'extendedTextMessage'
    )
  ) {
    const chatId = payload.notification.body.senderData.chatId;
    const phone = payload.notification.body.senderData.sender.replace('@c.us', '');
    let text;
    switch (payload.notification.body.messageData.typeMessage){
      case 'textMessage':
        text = payload.notification.body.messageData.textMessageData.textMessage;
        break;
      case 'quotedMessage':
        text = payload.notification.body.messageData.extendedTextMessageData.text;
        break;
      case 'reactionMessage':
        text = payload.notification.body.messageData.extendedTextMessageData.text;
        break;
      case 'extendedTextMessage':
        text = payload.notification.body.messageData.extendedTextMessageData.text;
        break;
      default:
        text = '';
    };
    const newMessage: TMessage = { 
      messageId: payload.notification.body.idMessage,
      text,
      timestamp: payload.notification.body.timestamp.toString(),
      type: 'incoming' 
    };

    const newCurrentChat = state.currentChat.phone === phone 
      ? { ...state.currentChat, messanges:[...state.currentChat.messages, newMessage] } 
      : state.currentChat;
      console.log('newCurrentChat', newCurrentChat);

      if (!state.chats[phone]) {
        return ({
          ...state,
          chats: {
            ...state.chats,
            [phone]: { phone, chatId, messages: [newMessage] }
          },
          receiveNotificationError: undefined,
          isNotificationRendered: true,
          receiptId: payload.notification.receiptId,
        })
      } else {
        const updatedMessages = state.chats[phone].messages
        .find((message) => message.timestamp === newMessage.timestamp)
        ? state.chats[phone].messages
        : [...state.chats[phone].messages, newMessage];
        
        const updatedChat = {
          ...state.chats[phone],
          messages: updatedMessages,
        };
        return ({
          ...state,
          chats: {...state.chats, [phone]: updatedChat},
          receiveNotificationError: undefined,
          isNotificationRendered: true,
          currentChat: newCurrentChat,
          receiptId: payload.notification.receiptId,
        });
      }
  } else {
    console.log('payload не загрузился в RECEIVE_NOTIFICATION_SUCCESS') // можно сделать оповещение пользователя   
    return ({
      ...state,
      receiptId: payload.notification?.receiptId,
      isNotificationRendered: true, // для удаления сообщений имеющих другой typeMessage нежели 'textMessage' и 'quotedMessage'
    })
  };
},

[RECEIVE_NOTIFICATION_FAILURE]: (state, { payload }) => ({
  ...state,
  receiveNotificationError: payload.error,
}),

[DELETE_NOTIFICATION_PENDING] : (state, {payload}) => ({
  ...state,
  isDeleteNotificationPending: payload.isDeleteNotificationPending,
}),

[DELETE_NOTIFICATION_SUCCESS]: (state, { payload }) => {
  
  if (payload.isMessageDeleted) {
    return ({
      ...state,
      isNotificationRendered: !payload.isMessageDeleted,
      receiptId: undefined,
    })
  }
  return state;
},

[DELETE_NOTIFICATION_FAILURE]: (state, { payload }) => ({
  ...state,
  deleteNotificationError: payload.error,
}),

}, initialState);

export default chatReducer;