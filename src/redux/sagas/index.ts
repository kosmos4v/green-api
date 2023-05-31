import { all } from 'redux-saga/effects';
import chatSaga from './chat';

export default function* RootSaga(): Generator {
    yield all([
      chatSaga(),
    ]);
};