import reducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(RootSaga);

export default store;