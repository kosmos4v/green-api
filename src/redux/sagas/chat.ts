import {
  call,
  put,
} from 'typed-redux-saga';
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
import { TDeleteNotificationResponse } from '../../models/responses';

function* sendMessage({ payload }: Action<{
  phone: string,
  currentMessage: TMessage,
  userId: string
}>) {
  try {
    yield put(sendMessagePending(true));
    const { idMessage } = yield* call(
      apiSendMessage,
      payload.phone,
      payload.currentMessage,
      payload.userId,
    );
    if (idMessage) {
      yield put(sendMessageSuccess(idMessage, payload.currentMessage, payload.phone));
    }
  } catch (e) {
    yield put(sendMessageFailure('Не удалось отправить сообщение'));
  } finally {
    yield put(sendMessagePending(false));
  }
}

function* deleteNotification({ payload }: Action<{
  receiptId: number
}>) {
  try {
    yield put(deleteNotificationPending(true));
    const isMessageDeleted: TDeleteNotificationResponse = yield* call(
      apiDeleteNotification,
      payload.receiptId,
    );
    if (isMessageDeleted) yield put(deleteNotificationSuccess(isMessageDeleted.result));
  } catch (e) {
    yield put(deleteNotificationFailure('Не удалось удалить уведомление'));
  } finally {
    yield put(deleteNotificationPending(false));
  }
}

function* receiveNotification(): Generator {
  try {
    yield put(receiveNotificationPending(true));
    const notification: TNotificationType | null = yield* call(apiReceiveNotification);
    if (notification) {
      yield put(receiveNotificationSuccess(notification));
      yield deleteNotification({
        payload: { receiptId: notification.receiptId },
        type: DELETE_NOTIFICATION,
      });
    } else {
      yield* call(receiveNotification);
    }
  } catch (e) {
    yield put(receiveNotificationFailure('Не удалось загрузить уведомление'));
  } finally {
    yield put(receiveNotificationPending(false));
  }
}

export default function* chatSaga() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
  yield takeEvery(RECEIVE_NOTIFICATION, receiveNotification);
  yield takeEvery(DELETE_NOTIFICATION, deleteNotification);
}
