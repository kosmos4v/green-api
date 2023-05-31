import { TMessage } from "../models/message";
import { request } from '../utils/requests/request';

export const apiSendMessage = async (phone: string, currentMessage: TMessage, userId: string) => {
  const body = {
    chatId: phone + '@c.us',
    message: currentMessage.text,
  }
  const result = await request('POST', 'sendMessage', userId, body);
  return await result.json();
};

export const apiReceiveNotification = async (userId: string) => {
  const result = await request('GET', 'receiveNotification', userId);
  return result.json();
};

export const apiDeleteNotification = async (userId: string, receiptId: number, _: undefined) => {
  const result = await request('DELETE', 'deleteNotification', userId, _, receiptId);
  return result.json();
}
