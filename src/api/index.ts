import { TMessage } from '../models/message';
import { TNotificationType } from '../models/notification';
import { TDeleteNotificationResponse, TSendMessageResponse } from '../models/responses';
import { request } from '../utils/requests/request';

export const apiSendMessage = async (
  phone: string,
  currentMessage: TMessage,
): Promise<TSendMessageResponse> => {
  const body = {
    chatId: `${phone}@c.us`,
    message: currentMessage.text,
  };
  const result = await request('POST', 'sendMessage', body);
  return await result.json() as TSendMessageResponse;
};

export const apiReceiveNotification = async (): Promise<TNotificationType> => {
  const result = await request('GET', 'receiveNotification');
  return await result.json() as TNotificationType;
};

export const apiDeleteNotification = async (
  userId: string,
  receiptId: number,
  _: undefined,
): Promise<TDeleteNotificationResponse> => {
  const result = await request('DELETE', 'deleteNotification', _, receiptId);
  return await result.json() as TDeleteNotificationResponse;
};
