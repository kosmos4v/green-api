import { TMessage } from '../models/message';
import { TNotificationType } from '../models/notification';
import { TDeleteNotificationResponse, TSendMessageResponse } from '../models/responses';
import { request } from '../utils/requests/request';

export const apiSendMessage = async (
  phone: string,
  currentMessage: TMessage,
  userId: string,
): Promise<TSendMessageResponse> => {
  const body = {
    chatId: `${phone}@c.us`,
    message: currentMessage.text,
  };
  const result = await request('POST', 'sendMessage', userId, body);
  return await result.json() as TSendMessageResponse;
};

export const apiReceiveNotification = async (
  userId: string,
): Promise<TNotificationType> => {
  const result = await request('GET', 'receiveNotification', userId);
  return await result.json() as TNotificationType;
};

export const apiDeleteNotification = async (
  userId: string,
  receiptId: number,
  _: undefined,
): Promise<TDeleteNotificationResponse> => {
  const result = await request('DELETE', 'deleteNotification', userId, _, receiptId);
  return await result.json() as TDeleteNotificationResponse;
};
