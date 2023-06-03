import { all } from 'redux-saga/effects';
import chatSaga from './chat';

export default function* RootSaga(): Generator {
  // eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all([
    chatSaga(),
  ]);
}
