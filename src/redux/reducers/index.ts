import { combineReducers } from 'redux';
import chat, { TChatState } from './chats';

export type TRootState = {
  chat: TChatState,
};

const reducer = combineReducers({
  chat,
});

export default reducer;
