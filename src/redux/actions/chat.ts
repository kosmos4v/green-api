import { TChat } from '../../models/chat';
import { TMessage } from '../../models/message';
import { TNotificationType } from '../../models/notification';

export const ADD_NEW_CHAT = 'ADD_NEW_CHAT';

export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDIND';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';
export const RECEIVE_NOTIFICATION_PENDING = 'RECEIVE_NOTIFICATION_PENDING';
export const RECEIVE_NOTIFICATION_SUCCESS = 'RECEIVE_NOTIFICATION_SUCCESS';
export const RECEIVE_NOTIFICATION_FAILURE = 'RECEIVE_NOTIFICATION_FAILURE';

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const DELETE_NOTIFICATION_PENDING = 'DELETE_NOTIFICATION_PENDING';
export const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
export const DELETE_NOTIFICATION_FAILURE = 'DELETE_NOTIFICATION_FAILURE';

export const addNewChat = (phone: string) => ({
  type: ADD_NEW_CHAT,
  payload: {
    phone,
  },
});

export const setCurrentChat = (currentChat: TChat) => ({
  type: SET_CURRENT_CHAT,
  payload: {
    currentChat,
  },
});

export const sendMessage = (
  phone: string,
  currentMessage: TMessage,
  userId: string,
) => ({
  type: SEND_MESSAGE,
  payload: {
    phone,
    currentMessage,
    userId,
  },
});

export const sendMessagePending = (isPending: boolean) => ({
  type: SEND_MESSAGE_PENDING,
  payload: {
    isSendMessagePending: isPending,
  },
});

export const sendMessageSuccess = (id: string, currentMessage: TMessage, phone: string) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: {
    incomingMessageId: id,
    currentMessage,
    phone,
  },
});

export const sendMessageFailure = (error: string) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: {
    error,
  },
});

export const receiveNotification = () => ({
  type: RECEIVE_NOTIFICATION,
});

export const receiveNotificationPending = (isPending: boolean) => ({
  type: RECEIVE_NOTIFICATION_PENDING,
  payload: {
    isReceiveNotificationPending: isPending,
  },
});

export const receiveNotificationSuccess = (notification: TNotificationType) => ({
  type: RECEIVE_NOTIFICATION_SUCCESS,
  payload: {
    notification,
  },
});

export const receiveNotificationFailure = (error: string) => ({
  type: RECEIVE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
});

export const deleteNotification = (userId: string, receiptId: number) => ({
  type: DELETE_NOTIFICATION,
  payload: {
    receiptId,
    userId,
  },
});

export const deleteNotificationPending = (isPending: boolean) => ({
  type: DELETE_NOTIFICATION_PENDING,
  payload: {
    isDeleteNotificationPending: isPending,
  },
});

export const deleteNotificationSuccess = (isMessageDeleted: boolean) => ({
  type: DELETE_NOTIFICATION_SUCCESS,
  payload: {
    isMessageDeleted,
  },
});

export const deleteNotificationFailure = (error: string) => ({
  type: DELETE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
});
