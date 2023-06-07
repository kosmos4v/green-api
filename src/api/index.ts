import { TMessage } from '../models/message';
import { TNotificationType } from '../models/notification';
import { TDeleteNotificationResponse, TSendMessageResponse } from '../models/responses';
import { request, ApiMethod } from '../utils/requests/request';

enum Method {
  post = 'POST',
  get = 'GET',
  delete = 'DELETE',
}

export const apiSendMessage = async (
  phone: string,
  currentMessage: TMessage,
): Promise<TSendMessageResponse> => {
  const body = {
    chatId: `${phone}@c.us`,
    message: currentMessage.text,
  };
  const result = await request(Method.post, ApiMethod.sendMessage, body);
  return await result.json() as TSendMessageResponse;
};

export const apiReceiveNotification = async (): Promise<TNotificationType> => {
  const result = await request(Method.get, ApiMethod.receiveNotification);
  return await result.json() as TNotificationType;
};

export const apiDeleteNotification = async (
  receiptId: number,
): Promise<TDeleteNotificationResponse> => {
  const result = await request(Method.delete, ApiMethod.deleteNotification, undefined, receiptId);
  return await result.json() as TDeleteNotificationResponse;
};
