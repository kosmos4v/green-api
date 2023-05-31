import { call, delay, put } from 'typed-redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import {
  SEND_MESSAGE,
  sendMessagePending,
  sendMessageSuccess,
  sendMessageFailure,
  RECEIVE_NOTIFICATION,
  receiveNotificationPending,
  receiveNotificationFailure,
  receiveNotificationSuccess,
  DELETE_NOTIFICATION,
  deleteNotificationFailure,
  deleteNotificationPending,
  deleteNotificationSuccess,
} from '../actions/chat';
import { TMessage } from '../../models/message';
import { apiSendMessage, apiReceiveNotification, apiDeleteNotification } from '../../api';
import { TNotificationType } from '../../models/notification';

function* sendMessage({ payload }: Action<{ phone: string, currentMessage: TMessage, userId: string}>) {
  try {
    yield put(sendMessagePending(true));
    const { idMessage } = yield* call(
      apiSendMessage,
      payload.phone,
      payload.currentMessage,
      payload.userId
    );
    if (idMessage) {
        yield put(sendMessageSuccess(idMessage, payload.currentMessage, payload.phone))};
  } catch (e) {
      yield put(sendMessageFailure('Не удалось отправить сообщение'));
  } finally {
      yield put(sendMessagePending(false));
  }
};

function* receiveNotification ({ payload }: Action<{ userId: string}>) {
  while (true) {
    try {
      yield put(receiveNotificationPending(true));
      const notification: TNotificationType | null = yield* call(apiReceiveNotification, payload.userId);
      if (notification) {
        yield put(receiveNotificationSuccess(notification));
        break;
      }
      else delay(2000);
    } catch (e) {
      yield put(receiveNotificationFailure('Не удалось загрузить уведомление'));
    } finally {
      yield put(receiveNotificationPending(false));
    }
  }
};

function* deleteNotification ({ payload }: Action<{ userId: string, receiptId: number, _: undefined}>) {
  try {
    yield put(deleteNotificationPending(true));
    const isMessageDeleted: {result: boolean} = yield* call(
      apiDeleteNotification,
      payload.userId,
      payload.receiptId,
      payload._
    );
    if (isMessageDeleted) yield put(deleteNotificationSuccess(isMessageDeleted.result))
  } catch (e) {
    yield put(deleteNotificationFailure('Не удалось удалить уведомление'));
  } finally {
    yield put (deleteNotificationPending(false));
  }
};



export default function* chatSaga () {
    yield takeEvery(SEND_MESSAGE, sendMessage);
    yield takeEvery(RECEIVE_NOTIFICATION, receiveNotification);
    yield takeEvery(DELETE_NOTIFICATION, deleteNotification);
}